const { sequelize } = require('../config/db');

/**
 * Lấy danh sách hạng phòng cho Cổng khách hàng (Guest Portal)
 */
const getRoomTypes = async (req, res, next) => {
  try {
    const [roomTypes] = await sequelize.query(
      `SELECT rt.*, 
              (SELECT COUNT(*) FROM Rooms r WHERE r.RoomTypeId = rt.RoomTypeId AND r.Status = 'CleanAvailable') AS AvailableCount
       FROM RoomTypes rt
       WHERE rt.Status = 'Active'
       ORDER BY rt.BasePrice ASC;`
    );

    return res.json({
      success: true,
      data: roomTypes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Lấy danh sách phòng vật lý theo bộ lọc (Tầng, Trạng thái, Chi nhánh)
 */
const getRooms = async (req, res, next) => {
  try {
    const { status, floor, branch } = req.query;

    let sql = `SELECT r.*, rt.TypeName, rt.BasePrice, rt.MaxOccupancy 
               FROM Rooms r 
               JOIN RoomTypes rt ON r.RoomTypeId = rt.RoomTypeId 
               WHERE 1=1`;
    const replacements = [];

    if (status) {
      sql += ` AND r.Status = ?`;
      replacements.push(status);
    }
    if (floor) {
      sql += ` AND r.Floor = ?`;
      replacements.push(floor);
    }
    if (branch) {
      sql += ` AND r.BranchName LIKE ?`;
      replacements.push(`%${branch}%`);
    }

    sql += ` ORDER BY r.Floor ASC, r.RoomNumber ASC LIMIT 200;`;

    const [rooms] = await sequelize.query(sql, { replacements });

    return res.json({
      success: true,
      data: rooms
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Cập nhật trạng thái buồng phòng (Dọn dẹp, Sạch, Đang ở, Bảo trì)
 */
const updateRoomStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, description } = req.body;

    const validStatuses = ['CleanAvailable', 'Occupied', 'Dirty', 'Cleaning', 'Maintenance', 'OutOfOrder', 'Reserved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Trạng thái không hợp lệ. Hợp lệ gồm: ${validStatuses.join(', ')}`
      });
    }

    await sequelize.query(
      `UPDATE Rooms 
       SET Status = ?, Description = COALESCE(?, Description), UpdatedAt = NOW() 
       WHERE RoomId = ?;`,
      {
        replacements: [status, description || null, id]
      }
    );

    // Gửi sự kiện WebSocket thông báo real-time tới lễ tân và buồng phòng
    const io = req.app.get('io');
    if (io) {
      io.emit('room:statusUpdated', { roomId: id, status });
    }

    return res.json({
      success: true,
      message: 'Cập nhật trạng thái phòng thành công',
      data: { roomId: id, status }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoomTypes,
  getRooms,
  updateRoomStatus
};

