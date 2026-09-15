const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Middlewares cơ bản
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Routes API chính
app.use('/api', routes);

// Trang chào mừng mặc định
app.get('/', (req, res) => {
  res.json({
    message: 'Chào mừng bạn đến với Hotel Management API Service (Express.js + Sequelize + MySQL)',
    docs: '/api/health',
    version: '1.0.0'
  });
});

// Xử lý 404 & Lỗi hệ thống
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

