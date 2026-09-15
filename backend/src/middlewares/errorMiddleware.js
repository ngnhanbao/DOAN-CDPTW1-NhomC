const errorHandler = (err, req, res, next) => {
  console.error('[Error Middleware]:', err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Đã có lỗi máy chủ xảy ra',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Đường dẫn không tồn tại: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFoundHandler };

