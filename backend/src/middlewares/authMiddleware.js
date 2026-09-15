const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy token xác thực hoặc sai định dạng'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hotel_management_super_secret_jwt_key_2025');

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token đã hết hạn, vui lòng đăng nhập lại'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ',
      error: error.message
    });
  }
};

module.exports = { verifyToken };

