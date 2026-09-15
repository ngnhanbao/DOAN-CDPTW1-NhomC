const fs = require('fs');
const path = require('path');

module.exports = {
  name: '001_create_all_tables',
  up: async (queryInterface, Sequelize) => {
    console.log('[Migration] Bắt đầu khởi tạo 50 bảng cơ sở dữ liệu...');

    // Đọc cú pháp DDL chuẩn từ db/init.sql
    const sqlPath = path.resolve(__dirname, '../../../db/init.sql');
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`Không tìm thấy file DDL tại đường dẫn: ${sqlPath}`);
    }

    const rawSql = fs.readFileSync(sqlPath, 'utf8');

    // Tách các câu lệnh theo dấu chấm phẩy và loại bỏ chú thích / câu lệnh rỗng
    const statements = rawSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('USE ') && !stmt.startsWith('CREATE DATABASE '));

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    for (const statement of statements) {
      try {
        await queryInterface.sequelize.query(statement);
      } catch (err) {
        console.error('[Migration Error]:', err.message);
        throw err;
      }
    }

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('[Migration] Đã tạo thành công 50 bảng theo đúng mô tả cấu trúc đề tài!');
  },

  down: async (queryInterface, Sequelize) => {
    console.log('[Migration Rollback] Bắt đầu xóa các bảng...');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    const tables = [
      'AuditLogs', 'StaffSchedules', 'BanquetEvents', 'OTARoomMappings', 'OTAChannels',
      'PoliceDeclarations', 'ShuttleSchedules', 'Vehicles', 'NightAuditReports', 'CashShifts',
      'SmartLockLogs', 'LostAndFoundItems', 'MaintenanceTickets', 'MarketingCampaigns',
      'LoyaltyPointTransactions', 'ChatbotMessages', 'ChatbotConversations', 'ChatbotKnowledgeBase',
      'Reviews', 'MinibarUsages', 'InventoryTransactions', 'InventoryItems', 'TableReservations',
      'FoodOrderDetails', 'FoodOrders', 'RestaurantTables', 'MenuItems', 'MenuCategories',
      'Payments', 'InvoiceDetails', 'Invoices', 'ServiceOrders', 'Services', 'ServiceCategories',
      'HousekeepingAssignments', 'RoomMoveHistory', 'Stays', 'BookingGuests', 'Bookings',
      'PricingRules', 'Rooms', 'RoomTypeAmenities', 'Amenities', 'RoomTypes', 'Users',
      'MembershipTiers', 'RolePermissions', 'Permissions', 'Roles', 'Vouchers'
    ];

    for (const table of tables) {
      await queryInterface.sequelize.query(`DROP TABLE IF EXISTS \`${table}\`;`);
    }

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('[Migration Rollback] Đã xóa toàn bộ các bảng thành công.');
  }
};

