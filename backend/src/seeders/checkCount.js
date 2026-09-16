const { sequelize } = require('../config/db');

async function checkTableCounts() {
  try {
    console.log('====================================================================');
    console.log('       KIỂM TRA SỐ LƯỢNG BẢN GHI (RECORDS) CỦA TOÀN BỘ 50 BẢNG      ');
    console.log('====================================================================');

    await sequelize.authenticate();

    // Lấy danh sách toàn bộ các bảng trong CSDL hotel_management (trừ bảng migration)
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
        AND table_name != 'SequelizeMeta'
      ORDER BY table_name ASC;
    `);

    if (tables.length === 0) {
      console.log('Chưa tìm thấy bảng nào trong cơ sở dữ liệu!');
      process.exit(0);
    }

    console.log(`\nTìm thấy tổng cộng: ${tables.length} bảng.\n`);
    console.log('STT | Tên Bảng (Table Name)             | Số Records  | Trạng Thái');
    console.log('----+-----------------------------------+-------------+-----------');

    let totalAllRecords = 0;
    let allPassed = true;

    for (let i = 0; i < tables.length; i++) {
      const tableName = tables[i].TABLE_NAME || tables[i].table_name;
      const [countResult] = await sequelize.query(`SELECT COUNT(*) AS total FROM \`${tableName}\`;`);
      const count = parseInt(countResult[0].total, 10);
      totalAllRecords += count;

      const isPassed = count >= 100000;
      if (!isPassed) allPassed = false;

      const stt = String(i + 1).padStart(3, ' ');
      const name = tableName.padEnd(33, ' ');
      const countStr = count.toLocaleString().padStart(11, ' ');
      const status = isPassed ? ' [ĐẠT >= 100k]' : '❌ [CHƯA ĐỦ]';

      console.log(`${stt} | ${name} | ${countStr} | ${status}`);
    }

    console.log('----+-----------------------------------+-------------+-----------');
    console.log(`TỔNG CỘNG TOÀN BỘ CƠ SỞ DỮ LIỆU: ${totalAllRecords.toLocaleString()} records`);
    console.log('====================================================================');

    if (allPassed) {
      console.log('🎉 TẤT CẢ CÁC BẢNG ĐÃ ĐẠT CHUẨN TRÊN 100.000 RECORDS THEO YÊU CẦU!');
    } else {
      console.log('⚠️ Có bảng chưa đủ 100.000 records. Bạn có thể chạy "npm run seed" để nạp đủ.');
    }
    console.log('====================================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi kiểm tra dữ liệu:', error.message);
    process.exit(1);
  }
}

checkTableCounts();

