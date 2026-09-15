const { sequelize } = require('../config/db');

/**
 * Đặt phòng trực tuyến (Guest Portal hoặc Lễ tân tạo tại quầy)
 */
const createBooking = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user ? req.user.id : req.body.userId;
    const {
      roomTypeId,
      checkInDate,
      checkOutDate,
      adults = 1,
      children = 0,
      roomQuantity = 1,
      specialRequests
    } = req.body;

    if (!roomTypeId || !checkInDate || !checkOutDate) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp loại phòng, ngày nhận phòng và ngày trả phòng'
      });
    }

    // 1. Lấy thông tin loại phòng & tính giá
    const [roomTypes] = await sequelize.query(
      'SELECT BasePrice FROM RoomTypes WHERE RoomTypeId = ? LIMIT 1;',
      { replacements: [roomTypeId], transaction }
    );

    if (roomTypes.length === 0) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Loại phòng không tồn tại' });
    }

    const basePrice = parseFloat(roomTypes[0].BasePrice);
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);

    const roomSubtotal = basePrice * diffDays * roomQuantity;
    const totalAmount = roomSubtotal;
    const depositAmount = totalAmount * 0.3; // Đặt cọc 30%

    // 2. Tạo mã QR và mã booking
    const bookingCode = `BK${Date.now().toString().slice(-8)}`;

    const [bookingResult] = await sequelize.query(
      `INSERT INTO Bookings 
       (UserId, RoomTypeId, CheckInDate, CheckOutDate, Adults, Children, RoomQuantity, 
        RoomSubtotal, TotalAmount, DepositAmount, Status, BookingSource, BookingQrCode, CreatedAt, UpdatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed', 'Direct', ?, NOW(), NOW());`,
      {
        replacements: [
          userId,
          roomTypeId,
          checkInDate,
          checkOutDate,
          adults,
          children,
          roomQuantity,
          roomSubtotal,
          totalAmount,
          depositAmount,
          `QR_${bookingCode}`
        ],
        transaction
      }
    );

    const bookingId = bookingResult;

    await transaction.commit();

    // Phát socket thông báo cho Lễ tân
    const io = req.app.get('io');
    if (io) {
      io.emit('booking:new', { bookingId, bookingCode, totalAmount });
    }

    return res.status(201).json({
      success: true,
      message: 'Đặt phòng thành công',
      data: {
        bookingId,
        bookingCode,
        totalAmount,
        depositAmount,
        status: 'Confirmed'
      }
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/**
 * Lấy danh sách booking (dành cho Admin / Lễ tân)
 */
const getBookings = async (req, res, next) => {
  try {
    const [bookings] = await sequelize.query(
      `SELECT b.*, u.FullName AS CustomerName, u.Phone AS CustomerPhone, u.Email AS CustomerEmail,
              rt.TypeName AS RoomTypeName
       FROM Bookings b
       JOIN Users u ON b.UserId = u.UserId
       JOIN RoomTypes rt ON b.RoomTypeId = rt.RoomTypeId
       ORDER BY b.BookingId DESC
       LIMIT 100;`
    );

    return res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Thủ tục Check-in tại quầy
 */
const checkIn = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { bookingId, roomId } = req.body;

    if (!bookingId || !roomId) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp mã đơn đặt phòng và phòng vật lý được cấp'
      });
    }

    // 1. Cập nhật booking status
    await sequelize.query(
      `UPDATE Bookings SET Status = 'CheckedIn', UpdatedAt = NOW() WHERE BookingId = ?;`,
      { replacements: [bookingId], transaction }
    );

    // 2. Tạo lượt lưu trú Stays
    const [stayResult] = await sequelize.query(
      `INSERT INTO Stays (BookingId, RoomId, ActualCheckIn, ExpectedCheckOut, Status, CreatedAt, UpdatedAt)
       SELECT BookingId, ?, NOW(), CheckOutDate, 'CheckedIn', NOW(), NOW()
       FROM Bookings WHERE BookingId = ?;`,
      { replacements: [roomId, bookingId], transaction }
    );

    // 3. Chuyển trạng thái phòng sang Occupied
    await sequelize.query(
      `UPDATE Rooms SET Status = 'Occupied', UpdatedAt = NOW() WHERE RoomId = ?;`,
      { replacements: [roomId], transaction }
    );

    await transaction.commit();

    const io = req.app.get('io');
    if (io) {
      io.emit('room:statusUpdated', { roomId, status: 'Occupied' });
      io.emit('booking:statusUpdated', { bookingId, status: 'CheckedIn' });
    }

    return res.json({
      success: true,
      message: 'Làm thủ tục Check-in thành công',
      data: { stayId: stayResult, bookingId, roomId }
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/**
 * Thủ tục Check-out và tạo hóa đơn thanh toán
 */
const checkOut = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { stayId } = req.body;

    if (!stayId) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp mã lượt lưu trú (stayId)' });
    }

    // 1. Lấy thông tin stay
    const [stays] = await sequelize.query(
      `SELECT s.*, b.TotalAmount FROM Stays s JOIN Bookings b ON s.BookingId = b.BookingId WHERE s.StayId = ? LIMIT 1;`,
      { replacements: [stayId], transaction }
    );

    if (stays.length === 0) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Không tìm thấy lượt lưu trú' });
    }

    const stay = stays[0];

    // 2. Cập nhật Stay sang CheckedOut
    await sequelize.query(
      `UPDATE Stays SET Status = 'CheckedOut', ActualCheckOut = NOW(), UpdatedAt = NOW() WHERE StayId = ?;`,
      { replacements: [stayId], transaction }
    );

    // 3. Đổi trạng thái phòng sang Dirty để buồng phòng dọn dẹp
    await sequelize.query(
      `UPDATE Rooms SET Status = 'Dirty', UpdatedAt = NOW() WHERE RoomId = ?;`,
      { replacements: [stay.RoomId], transaction }
    );

    // 4. Tạo hóa đơn thanh toán nếu chưa có
    const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
    const subtotal = parseFloat(stay.TotalAmount);
    const vat = +(subtotal * 0.1).toFixed(2);
    const total = +(subtotal + vat).toFixed(2);

    await sequelize.query(
      `INSERT INTO Invoices (StayId, InvoiceNumber, InvoiceDate, Subtotal, VATRate, VATAmount, TotalAmount, Status, CreatedAt, UpdatedAt)
       VALUES (?, ?, NOW(), ?, 10.00, ?, ?, 'Paid', NOW(), NOW());`,
      {
        replacements: [stayId, invoiceNumber, subtotal, vat, total],
        transaction
      }
    );

    await transaction.commit();

    const io = req.app.get('io');
    if (io) {
      io.emit('room:statusUpdated', { roomId: stay.RoomId, status: 'Dirty' });
      io.emit('housekeeping:task', { roomId: stay.RoomId, message: `Phòng ${stay.RoomId} cần dọn dẹp sau khi khách check-out` });
    }

    return res.json({
      success: true,
      message: 'Check-out hoàn tất, phòng đã được chuyển sang trạng thái chờ dọn dẹp',
      data: { invoiceNumber, totalAmount: total }
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookings,
  checkIn,
  checkOut
};

