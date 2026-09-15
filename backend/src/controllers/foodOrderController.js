const { sequelize } = require('../config/db');

/**
 * Tạo đơn gọi món ẩm thực (Room Service hoặc dùng tại nhà hàng)
 */
const createFoodOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user ? req.user.id : req.body.userId;
    const { stayId, tableId, orderType = 'RoomService', items, note } = req.body;

    if (!items || items.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Đơn món phải có ít nhất 1 món ăn' });
    }

    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.quantity * item.unitPrice;
    }

    // 1. Tạo FoodOrder
    const [orderResult] = await sequelize.query(
      `INSERT INTO FoodOrders (StayId, TableId, UserId, OrderTime, OrderType, Status, TotalAmount, PaymentMode, Note)
       VALUES (?, ?, ?, NOW(), ?, 'Pending', ?, 'RoomInvoice', ?);`,
      {
        replacements: [stayId || null, tableId || null, userId, orderType, totalAmount, note || null],
        transaction
      }
    );

    const foodOrderId = orderResult;

    // 2. Tạo chi tiết món FoodOrderDetails
    for (const item of items) {
      await sequelize.query(
        `INSERT INTO FoodOrderDetails (FoodOrderId, MenuItemId, Quantity, UnitPrice, Note)
         VALUES (?, ?, ?, ?, ?);`,
        {
          replacements: [foodOrderId, item.menuItemId, item.quantity, item.unitPrice, item.note || null],
          transaction
        }
      );
    }

    await transaction.commit();

    // Phát socket cho Màn hình Bếp (KDS)
    const io = req.app.get('io');
    if (io) {
      io.emit('kitchen:newOrder', {
        foodOrderId,
        orderType,
        totalAmount,
        itemCount: items.length,
        note
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Đặt món thành công, đơn đã được chuyển tới bộ phận bếp',
      data: { foodOrderId, totalAmount, status: 'Pending' }
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/**
 * Lấy danh sách đơn món cho Màn hình Bếp (Kitchen Display System - KDS)
 */
const getKitchenOrders = async (req, res, next) => {
  try {
    const [orders] = await sequelize.query(
      `SELECT fo.*, u.FullName AS OrderedBy, r.RoomNumber, rt.TableNumber
       FROM FoodOrders fo
       LEFT JOIN Users u ON fo.UserId = u.UserId
       LEFT JOIN Stays s ON fo.StayId = s.StayId
       LEFT JOIN Rooms r ON s.RoomId = r.RoomId
       LEFT JOIN RestaurantTables rt ON fo.TableId = rt.TableId
       WHERE fo.Status IN ('Pending', 'Confirmed', 'Preparing', 'Ready')
       ORDER BY fo.OrderTime ASC;`
    );

    // Lấy kèm chi tiết món
    for (const order of orders) {
      const [details] = await sequelize.query(
        `SELECT fod.*, mi.ItemName 
         FROM FoodOrderDetails fod
         JOIN MenuItems mi ON fod.MenuItemId = mi.MenuItemId
         WHERE fod.FoodOrderId = ?;`,
        { replacements: [order.FoodOrderId] }
      );
      order.items = details;
    }

    return res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Cập nhật trạng thái đơn chế biến món (Bếp cập nhật: Preparing, Ready, Delivered)
 */
const updateFoodOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivering', 'Served', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Trạng thái không hợp lệ. Hợp lệ gồm: ${validStatuses.join(', ')}`
      });
    }

    await sequelize.query(
      `UPDATE FoodOrders SET Status = ? WHERE FoodOrderId = ?;`,
      { replacements: [status, id] }
    );

    const io = req.app.get('io');
    if (io) {
      io.emit('kitchen:statusUpdated', { foodOrderId: id, status });
    }

    return res.json({
      success: true,
      message: `Cập nhật trạng thái đơn món thành "${status}"`,
      data: { foodOrderId: id, status }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Lấy thực đơn món ăn cho khách gọi
 */
const getMenuItems = async (req, res, next) => {
  try {
    const [items] = await sequelize.query(
      `SELECT mi.*, mc.CategoryName 
       FROM MenuItems mi 
       JOIN MenuCategories mc ON mi.CategoryId = mc.CategoryId
       WHERE mi.Status = 'Available'
       ORDER BY mi.CategoryId ASC, mi.Price ASC;`
    );

    return res.json({
      success: true,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFoodOrder,
  getKitchenOrders,
  updateFoodOrderStatus,
  getMenuItems
};

