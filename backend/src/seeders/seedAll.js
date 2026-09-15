const { sequelize } = require('../config/db');

// Đọc tham số dòng lệnh
const args = process.argv.slice(2);
const countArg = args.find(a => a.startsWith('--count='));
const batchArg = args.find(a => a.startsWith('--batch='));
const tablesArg = args.find(a => a.startsWith('--tables='));

const TARGET_COUNT = countArg ? parseInt(countArg.split('=')[1], 10) : 100000;
const BATCH_SIZE = batchArg ? parseInt(batchArg.split('=')[1], 10) : 5000;
const FILTER_TABLES = tablesArg ? tablesArg.split('=')[1].split(',') : null;

console.log('====================================================================');
console.log('           BỘ TẠO DỮ LIỆU SEEDER HIỆU NĂNG CAO (MYSQL)              ');
console.log(` Mục tiêu: ${TARGET_COUNT.toLocaleString()} records / bảng`);
console.log(` Kích thước lô (Batch size): ${BATCH_SIZE.toLocaleString()} records / lần ghi`);
console.log('====================================================================');

// Dữ liệu mẫu hỗ trợ tạo ngẫu nhiên thực tế
const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
const middleNames = ['Văn', 'Thị', 'Đức', 'Thanh', 'Hải', 'Quang', 'Bảo', 'Minh', 'Ngọc', 'Kim', 'Xuân', 'Hoàng', 'Gia'];
const lastNames = ['An', 'Bình', 'Châu', 'Dũng', 'Hương', 'Khánh', 'Lan', 'Nam', 'Phúc', 'Quân', 'Sơn', 'Tâm', 'Uyên', 'Vy', 'Huy', 'Tú'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDecimal = (min, max, decimals = 2) => +(Math.random() * (max - min) + min).toFixed(decimals);
const randomDate = (startYear = 2023, endYear = 2026) => {
  const date = new Date(startYear + Math.random() * (endYear - startYear), Math.random() * 12, Math.random() * 28 + 1);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};
const randomDateOnly = (startYear = 2023, endYear = 2026) => {
  const date = new Date(startYear + Math.random() * (endYear - startYear), Math.random() * 12, Math.random() * 28 + 1);
  return date.toISOString().slice(0, 10);
};

// Hàm chèn dữ liệu theo khối lớn tối ưu tốc độ
async function bulkInsertFast(tableName, columns, rowGenerator, totalCount = TARGET_COUNT) {
  if (FILTER_TABLES && !FILTER_TABLES.includes(tableName)) {
    console.log(`[Bỏ qua] Bảng ${tableName} không nằm trong bộ lọc.`);
    return;
  }

  const startTime = Date.now();
  console.log(`\n--> Bắt đầu nạp dữ liệu cho bảng: [${tableName}] (Tổng: ${totalCount.toLocaleString()} records)`);

  const colString = columns.map(c => `\`${c}\``).join(', ');
  let inserted = 0;

  while (inserted < totalCount) {
    const currentBatch = Math.min(BATCH_SIZE, totalCount - inserted);
    const valueTuples = [];

    for (let i = 0; i < currentBatch; i++) {
      const rowIndex = inserted + i + 1;
      const row = rowGenerator(rowIndex);
      const formattedValues = row.map(v => {
        if (v === null || v === undefined) return 'NULL';
        if (typeof v === 'number') return v;
        if (typeof v === 'boolean') return v ? 1 : 0;
        // Escape chuỗi an toàn
        return `'${String(v).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
      });
      valueTuples.push(`(${formattedValues.join(', ')})`);
    }

    const sql = `INSERT INTO \`${tableName}\` (${colString}) VALUES ${valueTuples.join(', ')};`;
    await sequelize.query(sql);

    inserted += currentBatch;
    const progress = ((inserted / totalCount) * 100).toFixed(1);
    process.stdout.write(`\r    [${tableName}] Đã ghi: ${inserted.toLocaleString()} / ${totalCount.toLocaleString()} (${progress}%)`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n    -> Hoàn thành bảng [${tableName}] trong ${duration}s!`);
}

async function runSeed() {
  try {
    await sequelize.authenticate();
    console.log('[Database] Kết nối MySQL thành công.');

    // Tắt kiểm tra khóa ngoại & chỉ mục tạm thời để đạt tốc độ ghi tối đa
    console.log('[Tối ưu] Đang tạm ngắt Foreign Key Checks & Unique Checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await sequelize.query('SET UNIQUE_CHECKS = 0;');

    // 1. Roles
    await bulkInsertFast('Roles', ['RoleId', 'RoleName', 'Description', 'CreatedAt'], (id) => [
      id,
      id <= 5 ? ['Admin', 'Receptionist', 'Kitchen', 'Housekeeping', 'Guest'][id - 1] : `Role_${id}`,
      `Mô tả chi tiết cho vai trò số ${id}`,
      randomDate()
    ]);

    // 2. Permissions
    await bulkInsertFast('Permissions', ['PermissionId', 'PermissionName', 'Module', 'Description', 'CreatedAt'], (id) => [
      id,
      `PERM_${id}_${randomItem(['VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT', 'APPROVE'])}`,
      randomItem(['User', 'Room', 'Booking', 'Kitchen', 'Housekeeping', 'Invoice', 'Report', 'Inventory']),
      `Quyền thao tác hệ thống số ${id}`,
      randomDate()
    ]);

    // 3. RolePermissions
    await bulkInsertFast('RolePermissions', ['RoleId', 'PermissionId', 'CreatedAt'], (id) => [
      randomInt(1, TARGET_COUNT),
      id,
      randomDate()
    ]);

    // 4. MembershipTiers
    await bulkInsertFast('MembershipTiers', ['TierId', 'TierName', 'MinPoints', 'Benefits', 'DiscountRate', 'CreatedAt'], (id) => [
      id,
      id <= 4 ? ['Standard', 'Silver', 'Gold', 'Platinum'][id - 1] : `Tier_${id}`,
      id * 500,
      `Ưu đãi đặc quyền cho hạng thành viên ${id}`,
      randomDecimal(0, 25, 2),
      randomDate()
    ]);

    // 5. Users
    await bulkInsertFast('Users', ['UserId', 'RoleId', 'TierId', 'FullName', 'Email', 'Phone', 'PasswordHash', 'IdNumber', 'IdType', 'DateOfBirth', 'Gender', 'Status', 'CreatedAt'], (id) => {
      const name = `${randomItem(firstNames)} ${randomItem(middleNames)} ${randomItem(lastNames)}`;
      return [
        id,
        randomInt(1, 5),
        randomInt(1, 4),
        name,
        `user_${id}@hoteldomain.vn`,
        `09${randomInt(10000000, 99999999)}`,
        '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', // băm của '123456'
        `079${randomInt(100000000, 999999999)}`,
        randomItem(['CCCD', 'Passport']),
        randomDateOnly(1975, 2005),
        randomItem(['Nam', 'Nữ', 'Khác']),
        randomItem(['Active', 'Active', 'Active', 'Inactive', 'Locked']),
        randomDate()
      ];
    });

    // 6. RoomTypes
    await bulkInsertFast('RoomTypes', ['RoomTypeId', 'TypeName', 'Description', 'BasePrice', 'MaxOccupancy', 'AdultCapacity', 'ChildCapacity', 'ImageUrl', 'Status', 'CreatedAt'], (id) => [
      id,
      id <= 5 ? ['Standard Single', 'Deluxe Double', 'Executive Suite', 'Family Ocean View', 'Presidential Suite'][id - 1] : `Hạng phòng cao cấp ${id}`,
      `Phòng nghỉ hiện đại tiện nghi bậc nhất tiêu chuẩn 5 sao mã số ${id}`,
      randomDecimal(500000, 15000000, 2),
      randomInt(2, 6),
      randomInt(1, 4),
      randomInt(0, 2),
      `https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800`,
      'Active',
      randomDate()
    ]);

    // 7. Amenities
    await bulkInsertFast('Amenities', ['AmenityId', 'AmenityName', 'Description', 'IconUrl', 'CreatedAt'], (id) => [
      id,
      id <= 6 ? ['Wifi tốc độ cao', 'Smart TV 65 inch', 'Bồn tắm massage', 'Minibar miễn phí', 'Ban công view biển', 'Điều hòa 2 chiều'][id - 1] : `Tiện nghi tiêu chuẩn ${id}`,
      `Trang thiết bị hiện đại phục vụ quý khách ${id}`,
      'https://cdn-icons-png.flaticon.com/512/123/123456.png',
      randomDate()
    ]);

    // 8. RoomTypeAmenities
    await bulkInsertFast('RoomTypeAmenities', ['RoomTypeId', 'AmenityId'], (id) => [
      randomInt(1, Math.min(TARGET_COUNT, 1000)),
      id
    ]);

    // 9. Rooms
    await bulkInsertFast('Rooms', ['RoomId', 'BranchName', 'RoomTypeId', 'RoomNumber', 'Floor', 'Status', 'Description', 'CreatedAt'], (id) => {
      const floor = randomInt(1, 30);
      const roomNum = `${floor}${String(randomInt(1, 99)).padStart(2, '0')}_${id}`;
      return [
        id,
        randomItem(['Chi nhánh Quận 1 - Sài Gòn', 'Chi nhánh Nha Trang Resort', 'Chi nhánh Đà Nẵng Beach']),
        randomInt(1, Math.min(TARGET_COUNT, 500)),
        roomNum,
        floor,
        randomItem(['CleanAvailable', 'Occupied', 'Dirty', 'Cleaning', 'Maintenance', 'Reserved']),
        `Phòng khách sạn hiện đại tầng ${floor}`,
        randomDate()
      ];
    });

    // 10. PricingRules
    await bulkInsertFast('PricingRules', ['PricingRuleId', 'RoomTypeId', 'RuleName', 'StartDate', 'EndDate', 'MinPrice', 'MaxPrice', 'PriceMultiplier', 'Conditions', 'Priority', 'Status', 'CreatedAt'], (id) => [
      id,
      randomInt(1, Math.min(TARGET_COUNT, 500)),
      `Quy tắc giá mùa cao điểm ${id}`,
      '2025-01-01',
      '2026-12-31',
      randomDecimal(500000, 1000000),
      randomDecimal(12000000, 25000000),
      randomDecimal(1.0, 1.8, 4),
      'Áp dụng ngày lễ, cuối tuần hoặc đặt sát ngày',
      randomInt(1, 10),
      'Active',
      randomDate()
    ]);

    // 11. Vouchers
    await bulkInsertFast('Vouchers', ['VoucherId', 'Code', 'DiscountType', 'DiscountValue', 'MinOrderAmount', 'MaxDiscountAmount', 'StartDate', 'EndDate', 'UsageLimit', 'UsedCount', 'Status', 'CreatedAt'], (id) => [
      id,
      `VOUCHER_${id}_${randomInt(1000, 9999)}`,
      randomItem(['Percent', 'Fixed']),
      randomDecimal(10, 500000),
      randomDecimal(500000, 2000000),
      randomDecimal(200000, 1000000),
      '2025-01-01 00:00:00',
      '2026-12-31 23:59:59',
      randomInt(100, 10000),
      randomInt(0, 100),
      'Active',
      randomDate()
    ]);

    // 12. OTAChannels
    await bulkInsertFast('OTAChannels', ['OTAChannelId', 'ChannelName', 'ApiType', 'ApiKey', 'Status', 'CreatedAt'], (id) => [
      id,
      id <= 4 ? ['Agoda', 'Booking.com', 'Traveloka', 'Expedia'][id - 1] : `Kênh OTA ${id}`,
      'REST_XML',
      `KEY_SECRET_${id}_${randomInt(100000, 999999)}`,
      'Active',
      randomDate()
    ]);

    // 13. OTARoomMappings
    await bulkInsertFast('OTARoomMappings', ['MappingId', 'OTAChannelId', 'RoomTypeId', 'OTARoomTypeCode', 'Status', 'LastSyncedAt'], (id) => [
      id,
      randomInt(1, Math.min(TARGET_COUNT, 100)),
      randomInt(1, Math.min(TARGET_COUNT, 500)),
      `OTA_MAP_CODE_${id}`,
      'Active',
      randomDate()
    ]);

    // 14. Bookings
    await bulkInsertFast('Bookings', ['BookingId', 'UserId', 'RoomTypeId', 'VoucherId', 'OTAChannelId', 'CheckInDate', 'CheckOutDate', 'Adults', 'Children', 'RoomQuantity', 'RoomSubtotal', 'SurchargeAmount', 'DiscountAmount', 'TotalAmount', 'DepositAmount', 'Status', 'BookingSource', 'BookingQrCode', 'CreatedAt'], (id) => {
      const subtotal = randomDecimal(1000000, 20000000);
      const discount = randomDecimal(0, 500000);
      const total = +(subtotal - discount).toFixed(2);
      return [
        id,
        randomInt(1, TARGET_COUNT),
        randomInt(1, Math.min(TARGET_COUNT, 500)),
        randomInt(1, Math.min(TARGET_COUNT, 1000)),
        randomInt(1, Math.min(TARGET_COUNT, 100)),
        randomDateOnly(2025, 2026),
        randomDateOnly(2025, 2026),
        randomInt(1, 4),
        randomInt(0, 2),
        randomInt(1, 3),
        subtotal,
        randomDecimal(0, 300000),
        discount,
        total,
        +(total * 0.3).toFixed(2),
        randomItem(['Pending', 'Confirmed', 'CheckedIn', 'Completed', 'Cancelled', 'NoShow']),
        randomItem(['Direct', 'Website', 'OTA', 'MobileApp']),
        `QR_BOOKING_CODE_${id}`,
        randomDate()
      ];
    });

    // 15. BookingGuests
    await bulkInsertFast('BookingGuests', ['BookingGuestId', 'BookingId', 'FullName', 'Email', 'Phone', 'IdNumber', 'IdType', 'DateOfBirth', 'Gender', 'IsPrimaryGuest', 'CreatedAt'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      `${randomItem(firstNames)} ${randomItem(middleNames)} ${randomItem(lastNames)}`,
      `guest_${id}@gmail.com`,
      `08${randomInt(10000000, 99999999)}`,
      `038${randomInt(100000000, 999999999)}`,
      'CCCD',
      randomDateOnly(1980, 2004),
      randomItem(['Nam', 'Nữ']),
      id % 2 === 0 ? 1 : 0,
      randomDate()
    ]);

    // 16. Stays
    await bulkInsertFast('Stays', ['StayId', 'BookingId', 'RoomId', 'ActualCheckIn', 'ExpectedCheckOut', 'ActualCheckOut', 'Status', 'DepositAmount', 'CreatedAt'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomDate(2025, 2026),
      randomDate(2025, 2026),
      randomDate(2025, 2026),
      randomItem(['Reserved', 'CheckedIn', 'Extended', 'CheckedOut', 'Cancelled']),
      randomDecimal(500000, 2000000),
      randomDate()
    ]);

    // 17. RoomMoveHistory
    await bulkInsertFast('RoomMoveHistory', ['MoveId', 'StayId', 'FromRoomId', 'ToRoomId', 'MoveDate', 'Reason', 'MovedBy'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomDate(),
      randomItem(['Khách muốn đổi view cao hơn', 'Nâng cấp hạng phòng VIP', 'Sửa chữa bảo trì hệ thống máy lạnh', 'Theo yêu cầu khách gia đình']),
      randomInt(1, 5)
    ]);

    // 18. HousekeepingAssignments
    await bulkInsertFast('HousekeepingAssignments', ['AssignmentId', 'RoomId', 'UserId', 'StayId', 'AssignmentDate', 'Priority', 'Status', 'StartedAt', 'CompletedAt', 'Note'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomDate(),
      randomInt(1, 5),
      randomItem(['Assigned', 'InProgress', 'Completed', 'Cancelled']),
      randomDate(),
      randomDate(),
      `Dọn vệ sinh phòng theo quy chuẩn số ${id}`
    ]);

    // 19. ServiceCategories
    await bulkInsertFast('ServiceCategories', ['CategoryId', 'CategoryName', 'Description', 'CreatedAt'], (id) => [
      id,
      id <= 5 ? ['Spa & Wellness', 'Giặt ủi cao cấp', 'Đưa đón sân bay', 'Thể thao & Giải trí', 'Tour tham quan'][id - 1] : `Danh mục dịch vụ ${id}`,
      `Mô tả tiện ích thuộc nhóm dịch vụ số ${id}`,
      randomDate()
    ]);

    // 20. Services
    await bulkInsertFast('Services', ['ServiceId', 'CategoryId', 'ServiceName', 'Price', 'Unit', 'Description', 'Status', 'CreatedAt'], (id) => [
      id,
      randomInt(1, Math.min(TARGET_COUNT, 20)),
      `Dịch vụ tiện ích đẳng cấp ${id}`,
      randomDecimal(100000, 3000000),
      randomItem(['Lần', 'Giờ', 'Bộ', 'Gói']),
      `Trải nghiệm dịch vụ tuyệt vời cho kỳ nghỉ của bạn ${id}`,
      'Active',
      randomDate()
    ]);

    // 21. ServiceOrders
    await bulkInsertFast('ServiceOrders', ['OrderId', 'StayId', 'ServiceId', 'CreatedBy', 'Quantity', 'UnitPrice', 'OrderDate', 'Status', 'Note'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, 5),
      randomDecimal(1, 5, 2),
      randomDecimal(100000, 2000000),
      randomDate(),
      randomItem(['Received', 'InProgress', 'Completed', 'Cancelled']),
      `Yêu cầu dịch vụ số ${id}`
    ]);

    // 22. Invoices
    await bulkInsertFast('Invoices', ['InvoiceId', 'StayId', 'InvoiceNumber', 'InvoiceDate', 'Subtotal', 'VATRate', 'VATAmount', 'TotalAmount', 'Status', 'PdfPath', 'CreatedAt'], (id) => {
      const subtotal = randomDecimal(2000000, 35000000);
      const vat = +(subtotal * 0.1).toFixed(2);
      return [
        id,
        randomInt(1, TARGET_COUNT),
        `INV-2025-${String(id).padStart(8, '0')}`,
        randomDate(),
        subtotal,
        10.00,
        vat,
        +(subtotal + vat).toFixed(2),
        randomItem(['Unpaid', 'PartiallyPaid', 'Paid', 'Cancelled']),
        `/invoices/pdf/inv_${id}.pdf`,
        randomDate()
      ];
    });

    // 23. InvoiceDetails
    await bulkInsertFast('InvoiceDetails', ['DetailId', 'InvoiceId', 'ItemType', 'ItemId', 'Description', 'Quantity', 'UnitPrice'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomItem(['Room', 'Service', 'Minibar', 'Food', 'Surcharge']),
      randomInt(1, 1000),
      `Chi tiết khoản thanh toán mục ${id}`,
      randomDecimal(1, 4, 2),
      randomDecimal(200000, 5000000)
    ]);

    // 24. Payments
    await bulkInsertFast('Payments', ['PaymentId', 'InvoiceId', 'BookingId', 'UserId', 'Amount', 'PaymentMethod', 'PaymentDate', 'TransactionCode', 'Status', 'GatewayResponse'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomDecimal(500000, 30000000),
      randomItem(['Cash', 'VNPay', 'MoMo', 'VietQR', 'Card', 'BankTransfer']),
      randomDate(),
      `TXN_CODE_${id}_${randomInt(100000, 999999)}`,
      randomItem(['Pending', 'Paid', 'Paid', 'Failed', 'Refunded']),
      '{"status":"00","message":"Success","bank":"VCB"}'
    ]);

    // 25. MenuCategories
    await bulkInsertFast('MenuCategories', ['CategoryId', 'CategoryName', 'Description', 'CreatedAt'], (id) => [
      id,
      id <= 5 ? ['Món khai vị', 'Món chính Á-Âu', 'Hải sản tươi sống', 'Tráng miệng', 'Đồ uống & Rượu vang'][id - 1] : `Menu Phân loại ${id}`,
      `Danh mục món ăn ẩm thực khách sạn ${id}`,
      randomDate()
    ]);

    // 26. MenuItems
    await bulkInsertFast('MenuItems', ['MenuItemId', 'CategoryId', 'ItemName', 'Price', 'Description', 'ImageUrl', 'Status', 'CreatedAt'], (id) => [
      id,
      randomInt(1, Math.min(TARGET_COUNT, 20)),
      `Món ăn đặc sản ${id}`,
      randomDecimal(50000, 1500000),
      `Hương vị thơm ngon tuyệt hảo được chế biến bởi đầu bếp 5 sao số ${id}`,
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      randomItem(['Available', 'Available', 'OutOfStock']),
      randomDate()
    ]);

    // 27. RestaurantTables
    await bulkInsertFast('RestaurantTables', ['TableId', 'BranchName', 'TableNumber', 'Location', 'Capacity', 'Status', 'CreatedAt'], (id) => [
      id,
      'Nhà hàng chính Royal Palm',
      `Bàn B${String(id).padStart(3, '0')}`,
      randomItem(['Sảnh chính tầng 1', 'Khu vực sân vườn', 'Tầng thượng Rooftop', 'Phòng VIP riêng']),
      randomInt(2, 12),
      randomItem(['Available', 'Reserved', 'Occupied', 'Cleaning']),
      randomDate()
    ]);

    // 28. FoodOrders
    await bulkInsertFast('FoodOrders', ['FoodOrderId', 'StayId', 'TableId', 'UserId', 'OrderTime', 'OrderType', 'Status', 'TotalAmount', 'PaymentMode', 'Note'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomDate(),
      randomItem(['RoomService', 'DineIn']),
      randomItem(['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivering', 'Served', 'Cancelled']),
      randomDecimal(150000, 4500000),
      randomItem(['RoomInvoice', 'PayNow']),
      `Ghi chú đơn bếp số ${id}`
    ]);

    // 29. FoodOrderDetails
    await bulkInsertFast('FoodOrderDetails', ['FoodOrderDetailId', 'FoodOrderId', 'MenuItemId', 'Quantity', 'UnitPrice', 'Note'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, 5),
      randomDecimal(50000, 800000),
      `Ít cay, không hành cho món ${id}`
    ]);

    // 30. TableReservations
    await bulkInsertFast('TableReservations', ['TableReservationId', 'TableId', 'UserId', 'ReservationTime', 'GuestCount', 'Status', 'Note', 'CreatedAt'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomDate(),
      randomInt(2, 10),
      randomItem(['Pending', 'Confirmed', 'Completed', 'Cancelled']),
      `Đặt bàn ăn tối sinh nhật ${id}`,
      randomDate()
    ]);

    // 31. InventoryItems
    await bulkInsertFast('InventoryItems', ['ItemId', 'ItemCode', 'ItemName', 'ItemType', 'Unit', 'Quantity', 'MinQuantity', 'UnitCost', 'Status', 'CreatedAt'], (id) => [
      id,
      `ITEM_KHO_${id}`,
      `Vật tư đồ dùng ${id}`,
      randomItem(['Consumable', 'Minibar', 'Linen', 'Housekeeping', 'Kitchen', 'Other']),
      randomItem(['Cái', 'Chai', 'Lon', 'Kg', 'Bộ']),
      randomDecimal(10, 500),
      randomDecimal(5, 50),
      randomDecimal(10000, 500000),
      'Active',
      randomDate()
    ]);

    // 32. InventoryTransactions
    await bulkInsertFast('InventoryTransactions', ['TransactionId', 'ItemId', 'RoomId', 'UserId', 'TransactionType', 'Quantity', 'ReferenceId', 'TransactionDate', 'Note'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, 5),
      randomItem(['Import', 'Export', 'Consume', 'Adjust', 'Transfer']),
      randomDecimal(1, 100),
      id,
      randomDate(),
      `Giao dịch kho hàng số ${id}`
    ]);

    // 33. MinibarUsages
    await bulkInsertFast('MinibarUsages', ['UsageId', 'StayId', 'ItemId', 'RecordedBy', 'Quantity', 'UsageDate', 'UnitPrice'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, 5),
      randomDecimal(1, 4),
      randomDate(),
      randomDecimal(25000, 150000)
    ]);

    // 34. Reviews
    await bulkInsertFast('Reviews', ['ReviewId', 'UserId', 'StayId', 'FoodOrderId', 'Rating', 'Comment', 'CreatedAt'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(3, 5),
      `Trải nghiệm rất tuyệt vời! Nhân viên nhiệt tình, phòng ốc sạch sẽ và đồ ăn ngon mã đánh giá ${id}.`,
      randomDate()
    ]);

    // 35. ChatbotKnowledgeBase
    await bulkInsertFast('ChatbotKnowledgeBase', ['KnowledgeId', 'Question', 'Answer', 'Category', 'Keywords', 'Status', 'CreatedAt'], (id) => [
      id,
      `Câu hỏi khách thường gặp ${id}: Giờ nhận/trả phòng và chính sách khách sạn là gì?`,
      `Khách sạn chúng tôi phục vụ nhận phòng từ 14:00 và trả phòng trước 12:00 trưa. Hỗ trợ nhận sớm và trả muộn tùy tình trạng phòng.`,
      randomItem(['Chính sách phòng', 'Ẩm thực', 'Dịch vụ Spa', 'Địa điểm tham quan', 'Thanh toán']),
      'checkin, checkout, giờ giấc, đặt phòng',
      'Active',
      randomDate()
    ]);

    // 36. ChatbotConversations
    await bulkInsertFast('ChatbotConversations', ['ConversationId', 'UserId', 'StartTime', 'EndTime', 'Status'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomDate(),
      randomDate(),
      randomItem(['Open', 'Closed'])
    ]);

    // 37. ChatbotMessages
    await bulkInsertFast('ChatbotMessages', ['MessageId', 'ConversationId', 'KnowledgeId', 'SenderType', 'MessageText', 'MessageTime'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomItem(['Guest', 'AI', 'System']),
      `Nội dung trao đổi hỗ trợ thông tin khách hàng số ${id}`,
      randomDate()
    ]);

    // 38. LoyaltyPointTransactions
    await bulkInsertFast('LoyaltyPointTransactions', ['TransactionId', 'UserId', 'TierId', 'StayId', 'Points', 'TransactionType', 'Description', 'CreatedAt'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, 4),
      randomInt(1, TARGET_COUNT),
      randomInt(50, 1000),
      randomItem(['Earn', 'Redeem', 'Adjust']),
      `Tích lũy điểm thưởng từ đợt lưu trú số ${id}`,
      randomDate()
    ]);

    // 39. MarketingCampaigns
    await bulkInsertFast('MarketingCampaigns', ['CampaignId', 'CreatedBy', 'TargetUserId', 'CampaignName', 'Channel', 'Recipient', 'Content', 'StartDate', 'EndDate', 'TargetType', 'DeliveryStatus', 'SentAt', 'CreatedAt'], (id) => [
      id,
      randomInt(1, 5),
      randomInt(1, TARGET_COUNT),
      `Chiến dịch tri ân khách hàng thân thiết mùa hè ${id}`,
      randomItem(['Email', 'SMS', 'Zalo']),
      `customer_${id}@gmail.com`,
      `Nhận ngay voucher ưu đãi 30% cho kỳ nghỉ dưỡng biển cùng gia đình!`,
      '2025-06-01 00:00:00',
      '2025-08-31 23:59:59',
      'Member',
      randomItem(['Draft', 'Scheduled', 'Sent']),
      randomDate(),
      randomDate()
    ]);

    // 40. MaintenanceTickets
    await bulkInsertFast('MaintenanceTickets', ['TicketId', 'RoomId', 'ReportedBy', 'AssignedTo', 'Title', 'Description', 'Priority', 'Status', 'CreatedAt', 'CompletedAt'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, 5),
      randomInt(1, 5),
      `Kiểm tra bảo dưỡng thiết bị điện phòng ${id}`,
      `Bảo trì định kỳ máy lạnh, vòi sen và đèn chiếu sáng`,
      randomItem(['Low', 'Medium', 'High', 'Critical']),
      randomItem(['Open', 'Assigned', 'InProgress', 'Resolved', 'Closed']),
      randomDate(),
      randomDate()
    ]);

    // 41. LostAndFoundItems
    await bulkInsertFast('LostAndFoundItems', ['LostFoundId', 'RoomId', 'FoundBy', 'ClaimedBy', 'ItemName', 'Description', 'FoundDate', 'Location', 'Status', 'ClaimedDate'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, 5),
      randomInt(1, TARGET_COUNT),
      `Đồ dùng khách để quên: ${randomItem(['Đồng hồ đeo tay', 'Sạc điện thoại iPhone', 'Ví tiền', 'Kính mắt thời trang', 'Áo khoác'])}`,
      `Tìm thấy tại bàn làm việc hoặc tủ quần áo ${id}`,
      randomDate(),
      'Khu vực phòng nghỉ',
      randomItem(['Found', 'Stored', 'Claimed']),
      randomDate()
    ]);

    // 42. SmartLockLogs
    await bulkInsertFast('SmartLockLogs', ['LogId', 'RoomId', 'StayId', 'UserId', 'DigitalKey', 'ActionType', 'ActionTime', 'Status', 'DeviceId'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      `DIGITAL_KEY_${id}_${randomInt(1000, 9999)}`,
      randomItem(['Unlock', 'Lock', 'IssueKey', 'RevokeKey', 'AccessDenied']),
      randomDate(),
      'Success',
      `SMART_LOCK_DEV_${randomInt(1, 500)}`
    ]);

    // 43. CashShifts
    await bulkInsertFast('CashShifts', ['ShiftId', 'UserId', 'ShiftDate', 'ShiftType', 'OpeningAmount', 'ClosingAmount', 'HandoverAmount', 'Status', 'Note', 'CreatedAt'], (id) => [
      id,
      randomInt(1, 5),
      randomDateOnly(),
      randomItem(['Morning', 'Afternoon', 'Night']),
      randomDecimal(5000000, 10000000),
      randomDecimal(15000000, 45000000),
      randomDecimal(10000000, 35000000),
      randomItem(['Open', 'Closed', 'HandedOver']),
      `Bàn giao tiền ca trực lễ tân số ${id}`,
      randomDate()
    ]);

    // 44. NightAuditReports
    await bulkInsertFast('NightAuditReports', ['ReportId', 'ReportDate', 'GeneratedBy', 'TotalRevenue', 'TotalBookings', 'TotalCheckIns', 'TotalCheckOuts', 'OccupancyRate', 'RevPAR', 'Status', 'Note', 'CreatedAt'], (id) => {
      // Để tránh vi phạm UNIQUE trên ReportDate khi nạp số lượng lớn, dùng offset ngày
      const baseDate = new Date(2020, 0, 1);
      baseDate.setDate(baseDate.getDate() + id);
      const reportDateStr = baseDate.toISOString().slice(0, 10);
      return [
        id,
        reportDateStr,
        randomInt(1, 5),
        randomDecimal(50000000, 300000000),
        randomInt(20, 150),
        randomInt(10, 80),
        randomInt(10, 80),
        randomDecimal(60, 98),
        randomDecimal(1200000, 2500000),
        'Completed',
        `Báo cáo kiểm toán kết thúc ngày ${reportDateStr}`,
        randomDate()
      ];
    });

    // 45. Vehicles
    await bulkInsertFast('Vehicles', ['VehicleId', 'BranchName', 'PlateNumber', 'VehicleType', 'SeatCapacity', 'DriverName', 'DriverPhone', 'Status', 'Description', 'CreatedAt'], (id) => [
      id,
      'Chi nhánh đưa đón khách sạn',
      `51F-${String(id).padStart(5, '0')}`,
      randomItem(['Sedan 4 chỗ', 'SUV 7 chỗ', 'Limousine 9 chỗ', 'Transit 16 chỗ']),
      randomItem([4, 7, 9, 16]),
      `Tài xế ${randomItem(lastNames)} ${randomItem(middleNames)}`,
      `091${randomInt(1000000, 9999999)}`,
      randomItem(['Available', 'InUse', 'Maintenance']),
      `Phương tiện phục vụ đưa đón cao cấp số ${id}`,
      randomDate()
    ]);

    // 46. ShuttleSchedules
    await bulkInsertFast('ShuttleSchedules', ['ShuttleScheduleId', 'VehicleId', 'BookingId', 'UserId', 'Route', 'DepartureTime', 'ArrivalTime', 'PassengerCount', 'Status', 'Note'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomInt(1, TARGET_COUNT),
      randomItem(['Sân bay Tân Sơn Nhất -> Khách sạn', 'Khách sạn -> Sân bay Quốc Tế', 'Tour tham quan nội thành 1 ngày']),
      randomDate(),
      randomDate(),
      randomInt(1, 8),
      randomItem(['Scheduled', 'Confirmed', 'Completed', 'Cancelled']),
      `Đón khách tại ga đến cột số 10 ${id}`
    ]);

    // 47. PoliceDeclarations
    await bulkInsertFast('PoliceDeclarations', ['DeclarationId', 'StayId', 'GuestName', 'IdNumber', 'IdType', 'Nationality', 'DeclarationDate', 'Status', 'ExportedAt'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      `${randomItem(firstNames)} ${randomItem(middleNames)} ${randomItem(lastNames)}`,
      `079${randomInt(100000000, 999999999)}`,
      'CCCD',
      'Việt Nam',
      randomDate(),
      randomItem(['Pending', 'Exported']),
      randomDate()
    ]);

    // 48. BanquetEvents
    await bulkInsertFast('BanquetEvents', ['EventId', 'BookingId', 'CreatedBy', 'EventName', 'EventType', 'EventDate', 'StartTime', 'EndTime', 'Venue', 'GuestCount', 'Revenue', 'Status', 'Note'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomInt(1, 5),
      `Hội nghị thượng đỉnh doanh nghiệp & Dạ tiệc cưới ${id}`,
      randomItem(['Hội nghị', 'Tiệc cưới', 'Gala Dinner', 'Sinh nhật']),
      randomDateOnly(),
      '18:00:00',
      '22:00:00',
      randomItem(['Grand Ballroom A', 'Sảnh tiệc Hoàng Gia', 'Hồ bơi ngoài trời']),
      randomInt(50, 500),
      randomDecimal(30000000, 250000000),
      randomItem(['Pending', 'Confirmed', 'InProgress', 'Completed']),
      `Chuẩn bị âm thanh ánh sáng và sân khấu theo tiêu chuẩn VIP ${id}`
    ]);

    // 49. StaffSchedules
    await bulkInsertFast('StaffSchedules', ['ScheduleId', 'UserId', 'BranchName', 'WorkDate', 'Shift', 'StartTime', 'EndTime', 'Status', 'CheckInTime', 'CheckOutTime', 'Note'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      'Chi nhánh chính khách sạn',
      randomDateOnly(),
      randomItem(['Sáng', 'Chiều', 'Đêm']),
      '07:00:00',
      '15:00:00',
      randomItem(['Scheduled', 'Present', 'Completed']),
      randomDate(),
      randomDate(),
      `Phân ca làm việc tuần ${id}`
    ]);

    // 50. AuditLogs
    await bulkInsertFast('AuditLogs', ['LogId', 'UserId', 'ActionType', 'TableName', 'RecordId', 'OldValues', 'NewValues', 'ActionTime', 'IpAddress'], (id) => [
      id,
      randomInt(1, TARGET_COUNT),
      randomItem(['INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT']),
      randomItem(['Bookings', 'Rooms', 'Invoices', 'Users', 'FoodOrders', 'Services']),
      randomInt(1, 100000),
      '{"status":"Pending"}',
      '{"status":"Confirmed"}',
      randomDate(),
      `192.168.1.${randomInt(2, 254)}`
    ]);

    console.log('\n[Khôi phục] Đang bật lại Foreign Key Checks & Unique Checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    await sequelize.query('SET UNIQUE_CHECKS = 1;');

    console.log('\n====================================================================');
    console.log('       TẤT CẢ 50 BẢNG ĐÃ ĐƯỢC SEED DỮ LIỆU ĐẠT CHUẨN THÀNH CÔNG!     ');
    console.log('====================================================================');
    process.exit(0);
  } catch (error) {
    console.error('\n[LỖI SEEDER]:', error);
    process.exit(1);
  }
}

runSeed();

