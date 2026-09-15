const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'hotel_management_super_secret_jwt_key_2025';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Đăng ký tài khoản khách hàng mới
 */
const register = async (req, res, next) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu'
      });
    }

    // Kiểm tra email tồn tại
    const [existing] = await sequelize.query('SELECT UserId FROM Users WHERE Email = ? LIMIT 1;', {
      replacements: [email]
    });

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email này đã được đăng ký trong hệ thống'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Mặc định RoleId = 5 (Guest/Customer)
    const [result] = await sequelize.query(
      `INSERT INTO Users (RoleId, TierId, FullName, Email, Phone, PasswordHash, Status, CreatedAt, UpdatedAt)
       VALUES (5, 1, ?, ?, ?, ?, 'Active', NOW(), NOW());`,
      {
        replacements: [fullName, email, phone || null, passwordHash]
      }
    );

    const newUserId = result;

    const token = jwt.sign(
      { id: newUserId, email, role: 'Guest', fullName },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công',
      data: {
        token,
        user: {
          id: newUserId,
          fullName,
          email,
          phone,
          role: 'Guest'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Đăng nhập người dùng (Admin, Receptionist, Kitchen, Housekeeping, Guest)
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }

    const [users] = await sequelize.query(
      `SELECT u.UserId, u.FullName, u.Email, u.PasswordHash, u.Status, u.Phone, r.RoleName
       FROM Users u
       JOIN Roles r ON u.RoleId = r.RoleId
       WHERE u.Email = ? LIMIT 1;`,
      {
        replacements: [email]
      }
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }

    const user = users[0];

    if (user.Status !== 'Active') {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản đã bị tạm khóa hoặc ngừng hoạt động'
      });
    }

    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }

    const token = jwt.sign(
      { id: user.UserId, email: user.Email, role: user.RoleName, fullName: user.FullName },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        token,
        user: {
          id: user.UserId,
          fullName: user.FullName,
          email: user.Email,
          phone: user.Phone,
          role: user.RoleName
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Lấy thông tin tài khoản đang đăng nhập
 */
const getProfile = async (req, res, next) => {
  try {
    const [users] = await sequelize.query(
      `SELECT u.UserId, u.FullName, u.Email, u.Phone, u.Status, u.Gender, u.DateOfBirth,
              r.RoleName, mt.TierName, mt.DiscountRate
       FROM Users u
       JOIN Roles r ON u.RoleId = r.RoleId
       LEFT JOIN MembershipTiers mt ON u.TierId = mt.TierId
       WHERE u.UserId = ? LIMIT 1;`,
      {
        replacements: [req.user.id]
      }
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin tài khoản'
      });
    }

    return res.json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile
};

