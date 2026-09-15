const { sequelize } = require('../config/db');
const path = require('path');
const fs = require('fs');

async function run() {
  try {
    console.log('====================================================');
    console.log('      TIẾN HÀNH CHẠY DATABASE MIGRATIONS            ');
    console.log('====================================================');

    await sequelize.authenticate();
    const queryInterface = sequelize.getQueryInterface();

    // 1. Tạo bảng theo dõi migration nếu chưa có
    await queryInterface.createTable('SequelizeMeta', {
      name: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
      }
    });

    // 2. Lấy danh sách migration đã chạy
    const [executedRows] = await sequelize.query('SELECT name FROM SequelizeMeta;');
    const executedMigrations = new Set(executedRows.map(r => r.name));

    // 3. Đọc các file migration trong thư mục hiện tại
    const files = fs
      .readdirSync(__dirname)
      .filter(f => f.endsWith('.js') && f !== 'runMigrations.js')
      .sort();

    for (const file of files) {
      const migration = require(path.join(__dirname, file));
      const migrationName = migration.name || file;

      if (executedMigrations.has(migrationName)) {
        console.log(`[Bỏ qua] Migration "${migrationName}" đã được thực thi trước đó.`);
        continue;
      }

      console.log(`[Chạy] Đang thực thi migration: ${migrationName}...`);
      await migration.up(queryInterface, sequelize.Sequelize);

      await sequelize.query('INSERT INTO SequelizeMeta (name) VALUES (?);', {
        replacements: [migrationName]
      });

      console.log(`[Thành công] Hoàn tất migration: ${migrationName}\n`);
    }

    console.log('====================================================');
    console.log('      TẤT CẢ MIGRATIONS ĐÃ HOÀN THÀNH TỐT ĐẸP!      ');
    console.log('====================================================');
    process.exit(0);
  } catch (error) {
    console.error('\n[LỖI MIGRATION]:', error.message);
    process.exit(1);
  }
}

run();

