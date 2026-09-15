const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 3306;
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'hotel_management';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+07:00'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`[Database] Kết nối MySQL thành công tại ${dbHost}:${dbPort}/${dbName}`);
  } catch (error) {
    console.error('[Database] Lỗi kết nối MySQL:', error.message);
  }
};

module.exports = { sequelize, connectDB };

