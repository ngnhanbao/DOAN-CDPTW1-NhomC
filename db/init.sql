-- ====================================================================
-- HOTEL MANAGEMENT SYSTEM - DATABASE INITIALIZATION SCRIPT (MySQL 8.0)
-- 50 Bảng theo mô tả đề tài
-- ====================================================================

CREATE DATABASE IF NOT EXISTS hotel_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hotel_management;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Roles (Bảng vai trò người dùng)
CREATE TABLE IF NOT EXISTS Roles (
    RoleId INT AUTO_INCREMENT PRIMARY KEY,
    RoleName VARCHAR(100) NOT NULL,
    Description VARCHAR(500) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Permissions (Bảng danh mục quyền)
CREATE TABLE IF NOT EXISTS Permissions (
    PermissionId INT AUTO_INCREMENT PRIMARY KEY,
    PermissionName VARCHAR(150) NOT NULL UNIQUE,
    Module VARCHAR(100) NOT NULL,
    Description VARCHAR(500) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. RolePermissions (Bảng gán quyền cho vai trò)
CREATE TABLE IF NOT EXISTS RolePermissions (
    RoleId INT NOT NULL,
    PermissionId INT NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (RoleId, PermissionId),
    CONSTRAINT FK_RolePermissions_Roles FOREIGN KEY (RoleId) REFERENCES Roles(RoleId) ON DELETE CASCADE,
    CONSTRAINT FK_RolePermissions_Permissions FOREIGN KEY (PermissionId) REFERENCES Permissions(PermissionId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. MembershipTiers (Bảng hạng thành viên)
CREATE TABLE IF NOT EXISTS MembershipTiers (
    TierId INT AUTO_INCREMENT PRIMARY KEY,
    TierName VARCHAR(100) NOT NULL,
    MinPoints INT NOT NULL DEFAULT 0,
    Benefits VARCHAR(1000) NULL,
    DiscountRate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Users (Bảng người dùng & tài khoản)
CREATE TABLE IF NOT EXISTS Users (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    RoleId INT NOT NULL,
    TierId INT NULL,
    FullName VARCHAR(150) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Phone VARCHAR(30) NULL,
    PasswordHash VARCHAR(500) NOT NULL,
    IdNumber VARCHAR(50) NULL,
    IdType VARCHAR(30) NULL,
    DateOfBirth DATE NULL,
    Gender VARCHAR(20) NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Users_Roles FOREIGN KEY (RoleId) REFERENCES Roles(RoleId),
    CONSTRAINT FK_Users_MembershipTiers FOREIGN KEY (TierId) REFERENCES MembershipTiers(TierId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. RoomTypes (Bảng loại phòng)
CREATE TABLE IF NOT EXISTS RoomTypes (
    RoomTypeId INT AUTO_INCREMENT PRIMARY KEY,
    TypeName VARCHAR(100) NOT NULL,
    Description VARCHAR(1000) NULL,
    BasePrice DECIMAL(18,2) NOT NULL,
    MaxOccupancy INT NOT NULL DEFAULT 2,
    AdultCapacity INT NOT NULL DEFAULT 2,
    ChildCapacity INT NOT NULL DEFAULT 1,
    ImageUrl VARCHAR(1000) NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Amenities (Bảng tiện nghi)
CREATE TABLE IF NOT EXISTS Amenities (
    AmenityId INT AUTO_INCREMENT PRIMARY KEY,
    AmenityName VARCHAR(150) NOT NULL,
    Description VARCHAR(500) NULL,
    IconUrl VARCHAR(1000) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. RoomTypeAmenities (Bảng gán tiện nghi cho loại phòng)
CREATE TABLE IF NOT EXISTS RoomTypeAmenities (
    RoomTypeId INT NOT NULL,
    AmenityId INT NOT NULL,
    PRIMARY KEY (RoomTypeId, AmenityId),
    CONSTRAINT FK_RTA_RoomTypes FOREIGN KEY (RoomTypeId) REFERENCES RoomTypes(RoomTypeId) ON DELETE CASCADE,
    CONSTRAINT FK_RTA_Amenities FOREIGN KEY (AmenityId) REFERENCES Amenities(AmenityId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Rooms (Bảng phòng vật lý)
CREATE TABLE IF NOT EXISTS Rooms (
    RoomId INT AUTO_INCREMENT PRIMARY KEY,
    BranchName VARCHAR(200) NOT NULL DEFAULT 'Chi nhánh chính',
    RoomTypeId INT NOT NULL,
    RoomNumber VARCHAR(20) NOT NULL,
    Floor INT NOT NULL DEFAULT 1,
    Status VARCHAR(40) NOT NULL DEFAULT 'CleanAvailable',
    Description VARCHAR(500) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Rooms_RoomTypes FOREIGN KEY (RoomTypeId) REFERENCES RoomTypes(RoomTypeId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. PricingRules (Bảng quy tắc giá)
CREATE TABLE IF NOT EXISTS PricingRules (
    PricingRuleId INT AUTO_INCREMENT PRIMARY KEY,
    RoomTypeId INT NOT NULL,
    RuleName VARCHAR(150) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    MinPrice DECIMAL(18,2) NULL,
    MaxPrice DECIMAL(18,2) NULL,
    PriceMultiplier DECIMAL(8,4) NOT NULL DEFAULT 1.0000,
    Conditions VARCHAR(1000) NULL,
    Priority INT NOT NULL DEFAULT 1,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_PricingRules_RoomTypes FOREIGN KEY (RoomTypeId) REFERENCES RoomTypes(RoomTypeId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Vouchers (Bảng voucher khuyến mãi)
CREATE TABLE IF NOT EXISTS Vouchers (
    VoucherId INT AUTO_INCREMENT PRIMARY KEY,
    Code VARCHAR(50) NOT NULL UNIQUE,
    DiscountType VARCHAR(20) NOT NULL,
    DiscountValue DECIMAL(18,2) NOT NULL,
    MinOrderAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    MaxDiscountAmount DECIMAL(18,2) NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    UsageLimit INT NOT NULL DEFAULT 100,
    UsedCount INT NOT NULL DEFAULT 0,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. OTAChannels (Bảng kênh OTA)
CREATE TABLE IF NOT EXISTS OTAChannels (
    OTAChannelId INT AUTO_INCREMENT PRIMARY KEY,
    ChannelName VARCHAR(100) NOT NULL,
    ApiType VARCHAR(50) NOT NULL,
    ApiKey VARCHAR(500) NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. OTARoomMappings (Bảng mapping phòng OTA)
CREATE TABLE IF NOT EXISTS OTARoomMappings (
    MappingId INT AUTO_INCREMENT PRIMARY KEY,
    OTAChannelId INT NOT NULL,
    RoomTypeId INT NOT NULL,
    OTARoomTypeCode VARCHAR(100) NOT NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    LastSyncedAt DATETIME NULL,
    CONSTRAINT FK_OTARoomMappings_OTAChannels FOREIGN KEY (OTAChannelId) REFERENCES OTAChannels(OTAChannelId) ON DELETE CASCADE,
    CONSTRAINT FK_OTARoomMappings_RoomTypes FOREIGN KEY (RoomTypeId) REFERENCES RoomTypes(RoomTypeId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Bookings (Bảng đặt phòng)
CREATE TABLE IF NOT EXISTS Bookings (
    BookingId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    RoomTypeId INT NOT NULL,
    VoucherId INT NULL,
    OTAChannelId INT NULL,
    CheckInDate DATE NOT NULL,
    CheckOutDate DATE NOT NULL,
    Adults INT NOT NULL DEFAULT 1,
    Children INT NOT NULL DEFAULT 0,
    RoomQuantity INT NOT NULL DEFAULT 1,
    NumberOfNights INT GENERATED ALWAYS AS (GREATEST(DATEDIFF(CheckOutDate, CheckInDate), 1)) VIRTUAL,
    RoomSubtotal DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    SurchargeAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    DiscountAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    TotalAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    DepositAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    BookingSource VARCHAR(30) NOT NULL DEFAULT 'Direct',
    BookingQrCode VARCHAR(500) NULL,
    ConfirmationSentAt DATETIME NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Bookings_Users FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_Bookings_RoomTypes FOREIGN KEY (RoomTypeId) REFERENCES RoomTypes(RoomTypeId),
    CONSTRAINT FK_Bookings_Vouchers FOREIGN KEY (VoucherId) REFERENCES Vouchers(VoucherId) ON DELETE SET NULL,
    CONSTRAINT FK_Bookings_OTAChannels FOREIGN KEY (OTAChannelId) REFERENCES OTAChannels(OTAChannelId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. BookingGuests (Bảng khách trong booking)
CREATE TABLE IF NOT EXISTS BookingGuests (
    BookingGuestId INT AUTO_INCREMENT PRIMARY KEY,
    BookingId INT NOT NULL,
    FullName VARCHAR(150) NOT NULL,
    Email VARCHAR(150) NULL,
    Phone VARCHAR(30) NULL,
    IdNumber VARCHAR(50) NULL,
    IdType VARCHAR(30) NULL,
    DateOfBirth DATE NULL,
    Gender VARCHAR(20) NULL,
    IsPrimaryGuest TINYINT(1) NOT NULL DEFAULT 0,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_BookingGuests_Bookings FOREIGN KEY (BookingId) REFERENCES Bookings(BookingId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. Stays (Bảng lượt lưu trú thực tế)
CREATE TABLE IF NOT EXISTS Stays (
    StayId INT AUTO_INCREMENT PRIMARY KEY,
    BookingId INT NOT NULL,
    RoomId INT NOT NULL,
    ActualCheckIn DATETIME NULL,
    ExpectedCheckOut DATETIME NOT NULL,
    ActualCheckOut DATETIME NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Reserved',
    DepositAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Stays_Bookings FOREIGN KEY (BookingId) REFERENCES Bookings(BookingId) ON DELETE CASCADE,
    CONSTRAINT FK_Stays_Rooms FOREIGN KEY (RoomId) REFERENCES Rooms(RoomId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. RoomMoveHistory (Bảng lịch sử đổi phòng)
CREATE TABLE IF NOT EXISTS RoomMoveHistory (
    MoveId INT AUTO_INCREMENT PRIMARY KEY,
    StayId INT NOT NULL,
    FromRoomId INT NULL,
    ToRoomId INT NOT NULL,
    MoveDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Reason VARCHAR(500) NULL,
    MovedBy INT NULL,
    CONSTRAINT FK_RMH_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE CASCADE,
    CONSTRAINT FK_RMH_FromRoom FOREIGN KEY (FromRoomId) REFERENCES Rooms(RoomId) ON DELETE SET NULL,
    CONSTRAINT FK_RMH_ToRoom FOREIGN KEY (ToRoomId) REFERENCES Rooms(RoomId),
    CONSTRAINT FK_RMH_Users FOREIGN KEY (MovedBy) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. HousekeepingAssignments (Bảng nhiệm vụ buồng phòng)
CREATE TABLE IF NOT EXISTS HousekeepingAssignments (
    AssignmentId INT AUTO_INCREMENT PRIMARY KEY,
    RoomId INT NOT NULL,
    UserId INT NOT NULL,
    StayId INT NULL,
    AssignmentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Priority INT NOT NULL DEFAULT 1,
    Status VARCHAR(30) NOT NULL DEFAULT 'Assigned',
    StartedAt DATETIME NULL,
    CompletedAt DATETIME NULL,
    Note VARCHAR(500) NULL,
    CONSTRAINT FK_HA_Rooms FOREIGN KEY (RoomId) REFERENCES Rooms(RoomId),
    CONSTRAINT FK_HA_Users FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_HA_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. ServiceCategories (Bảng nhóm dịch vụ)
CREATE TABLE IF NOT EXISTS ServiceCategories (
    CategoryId INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL,
    Description VARCHAR(500) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 20. Services (Bảng danh mục dịch vụ)
CREATE TABLE IF NOT EXISTS Services (
    ServiceId INT AUTO_INCREMENT PRIMARY KEY,
    CategoryId INT NOT NULL,
    ServiceName VARCHAR(150) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Unit VARCHAR(50) NOT NULL DEFAULT 'Lần',
    Description VARCHAR(1000) NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Services_ServiceCategories FOREIGN KEY (CategoryId) REFERENCES ServiceCategories(CategoryId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 21. ServiceOrders (Bảng đơn dịch vụ)
CREATE TABLE IF NOT EXISTS ServiceOrders (
    OrderId INT AUTO_INCREMENT PRIMARY KEY,
    StayId INT NOT NULL,
    ServiceId INT NOT NULL,
    CreatedBy INT NULL,
    Quantity DECIMAL(18,2) NOT NULL DEFAULT 1.00,
    UnitPrice DECIMAL(18,2) NOT NULL,
    TotalPrice DECIMAL(18,2) GENERATED ALWAYS AS (Quantity * UnitPrice) VIRTUAL,
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(30) NOT NULL DEFAULT 'Received',
    Note VARCHAR(500) NULL,
    CONSTRAINT FK_SO_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE CASCADE,
    CONSTRAINT FK_SO_Services FOREIGN KEY (ServiceId) REFERENCES Services(ServiceId),
    CONSTRAINT FK_SO_Users FOREIGN KEY (CreatedBy) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 22. Invoices (Bảng hóa đơn)
CREATE TABLE IF NOT EXISTS Invoices (
    InvoiceId INT AUTO_INCREMENT PRIMARY KEY,
    StayId INT NOT NULL,
    InvoiceNumber VARCHAR(50) NOT NULL UNIQUE,
    InvoiceDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Subtotal DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    VATRate DECIMAL(5,2) NOT NULL DEFAULT 10.00,
    VATAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    TotalAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Status VARCHAR(30) NOT NULL DEFAULT 'Unpaid',
    PdfPath VARCHAR(1000) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Invoices_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 23. InvoiceDetails (Bảng chi tiết hóa đơn)
CREATE TABLE IF NOT EXISTS InvoiceDetails (
    DetailId INT AUTO_INCREMENT PRIMARY KEY,
    InvoiceId INT NOT NULL,
    ItemType VARCHAR(30) NOT NULL,
    ItemId INT NULL,
    Description VARCHAR(500) NOT NULL,
    Quantity DECIMAL(18,2) NOT NULL DEFAULT 1.00,
    UnitPrice DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    TotalPrice DECIMAL(18,2) GENERATED ALWAYS AS (Quantity * UnitPrice) VIRTUAL,
    CONSTRAINT FK_InvoiceDetails_Invoices FOREIGN KEY (InvoiceId) REFERENCES Invoices(InvoiceId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 24. Payments (Bảng thanh toán)
CREATE TABLE IF NOT EXISTS Payments (
    PaymentId INT AUTO_INCREMENT PRIMARY KEY,
    InvoiceId INT NULL,
    BookingId INT NULL,
    UserId INT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    PaymentMethod VARCHAR(30) NOT NULL,
    PaymentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    TransactionCode VARCHAR(150) NOT NULL UNIQUE,
    Status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    GatewayResponse LONGTEXT NULL,
    CONSTRAINT FK_Payments_Invoices FOREIGN KEY (InvoiceId) REFERENCES Invoices(InvoiceId) ON DELETE SET NULL,
    CONSTRAINT FK_Payments_Bookings FOREIGN KEY (BookingId) REFERENCES Bookings(BookingId) ON DELETE SET NULL,
    CONSTRAINT FK_Payments_Users FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 25. MenuCategories (Bảng danh mục món ăn F&B)
CREATE TABLE IF NOT EXISTS MenuCategories (
    CategoryId INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL,
    Description VARCHAR(500) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 26. MenuItems (Bảng món ăn/thức uống)
CREATE TABLE IF NOT EXISTS MenuItems (
    MenuItemId INT AUTO_INCREMENT PRIMARY KEY,
    CategoryId INT NOT NULL,
    ItemName VARCHAR(150) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Description VARCHAR(1000) NULL,
    ImageUrl VARCHAR(1000) NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Available',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_MenuItems_Categories FOREIGN KEY (CategoryId) REFERENCES MenuCategories(CategoryId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 27. RestaurantTables (Bảng bàn nhà hàng)
CREATE TABLE IF NOT EXISTS RestaurantTables (
    TableId INT AUTO_INCREMENT PRIMARY KEY,
    BranchName VARCHAR(200) NOT NULL DEFAULT 'Nhà hàng chính',
    TableNumber VARCHAR(20) NOT NULL,
    Location VARCHAR(150) NULL,
    Capacity INT NOT NULL DEFAULT 4,
    Status VARCHAR(30) NOT NULL DEFAULT 'Available',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 28. FoodOrders (Bảng đơn món ăn F&B)
CREATE TABLE IF NOT EXISTS FoodOrders (
    FoodOrderId INT AUTO_INCREMENT PRIMARY KEY,
    StayId INT NULL,
    TableId INT NULL,
    UserId INT NOT NULL,
    OrderTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    OrderType VARCHAR(30) NOT NULL DEFAULT 'RoomService',
    Status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    TotalAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    PaymentMode VARCHAR(30) NOT NULL DEFAULT 'RoomInvoice',
    Note VARCHAR(500) NULL,
    CONSTRAINT FK_FoodOrders_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE SET NULL,
    CONSTRAINT FK_FoodOrders_Tables FOREIGN KEY (TableId) REFERENCES RestaurantTables(TableId) ON DELETE SET NULL,
    CONSTRAINT FK_FoodOrders_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 29. FoodOrderDetails (Bảng chi tiết đơn món ăn)
CREATE TABLE IF NOT EXISTS FoodOrderDetails (
    FoodOrderDetailId INT AUTO_INCREMENT PRIMARY KEY,
    FoodOrderId INT NOT NULL,
    MenuItemId INT NOT NULL,
    Quantity INT NOT NULL DEFAULT 1,
    UnitPrice DECIMAL(18,2) NOT NULL,
    TotalPrice DECIMAL(18,2) GENERATED ALWAYS AS (Quantity * UnitPrice) VIRTUAL,
    Note VARCHAR(500) NULL,
    CONSTRAINT FK_FOD_FoodOrders FOREIGN KEY (FoodOrderId) REFERENCES FoodOrders(FoodOrderId) ON DELETE CASCADE,
    CONSTRAINT FK_FOD_MenuItems FOREIGN KEY (MenuItemId) REFERENCES MenuItems(MenuItemId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 30. TableReservations (Bảng đặt bàn nhà hàng)
CREATE TABLE IF NOT EXISTS TableReservations (
    TableReservationId INT AUTO_INCREMENT PRIMARY KEY,
    TableId INT NOT NULL,
    UserId INT NOT NULL,
    ReservationTime DATETIME NOT NULL,
    GuestCount INT NOT NULL DEFAULT 2,
    Status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    Note VARCHAR(500) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_TableReservations_Tables FOREIGN KEY (TableId) REFERENCES RestaurantTables(TableId),
    CONSTRAINT FK_TableReservations_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 31. InventoryItems (Bảng vật tư hàng tồn kho)
CREATE TABLE IF NOT EXISTS InventoryItems (
    ItemId INT AUTO_INCREMENT PRIMARY KEY,
    ItemCode VARCHAR(50) NOT NULL UNIQUE,
    ItemName VARCHAR(150) NOT NULL,
    ItemType VARCHAR(30) NOT NULL,
    Unit VARCHAR(30) NOT NULL DEFAULT 'Cái',
    Quantity DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    MinQuantity DECIMAL(18,2) NOT NULL DEFAULT 5.00,
    UnitCost DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 32. InventoryTransactions (Bảng giao dịch xuất nhập kho)
CREATE TABLE IF NOT EXISTS InventoryTransactions (
    TransactionId INT AUTO_INCREMENT PRIMARY KEY,
    ItemId INT NOT NULL,
    RoomId INT NULL,
    UserId INT NULL,
    TransactionType VARCHAR(30) NOT NULL,
    Quantity DECIMAL(18,2) NOT NULL,
    ReferenceId INT NULL,
    TransactionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Note VARCHAR(500) NULL,
    CONSTRAINT FK_IT_Items FOREIGN KEY (ItemId) REFERENCES InventoryItems(ItemId),
    CONSTRAINT FK_IT_Rooms FOREIGN KEY (RoomId) REFERENCES Rooms(RoomId) ON DELETE SET NULL,
    CONSTRAINT FK_IT_Users FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 33. MinibarUsages (Bảng sử dụng minibar)
CREATE TABLE IF NOT EXISTS MinibarUsages (
    UsageId INT AUTO_INCREMENT PRIMARY KEY,
    StayId INT NOT NULL,
    ItemId INT NOT NULL,
    RecordedBy INT NULL,
    Quantity DECIMAL(18,2) NOT NULL DEFAULT 1.00,
    UsageDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UnitPrice DECIMAL(18,2) NOT NULL,
    TotalAmount DECIMAL(18,2) GENERATED ALWAYS AS (Quantity * UnitPrice) VIRTUAL,
    CONSTRAINT FK_MU_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE CASCADE,
    CONSTRAINT FK_MU_Items FOREIGN KEY (ItemId) REFERENCES InventoryItems(ItemId),
    CONSTRAINT FK_MU_Users FOREIGN KEY (RecordedBy) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 34. Reviews (Bảng đánh giá của khách hàng)
CREATE TABLE IF NOT EXISTS Reviews (
    ReviewId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    StayId INT NULL,
    FoodOrderId INT NULL,
    Rating TINYINT NOT NULL,
    Comment VARCHAR(2000) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Reviews_Users FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_Reviews_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE SET NULL,
    CONSTRAINT FK_Reviews_FoodOrders FOREIGN KEY (FoodOrderId) REFERENCES FoodOrders(FoodOrderId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 35. ChatbotKnowledgeBase (Bảng cơ sở tri thức AI/Chatbot)
CREATE TABLE IF NOT EXISTS ChatbotKnowledgeBase (
    KnowledgeId INT AUTO_INCREMENT PRIMARY KEY,
    Question VARCHAR(1000) NOT NULL,
    Answer LONGTEXT NOT NULL,
    Category VARCHAR(100) NOT NULL,
    Keywords VARCHAR(1000) NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 36. ChatbotConversations (Bảng phiên hội thoại chatbot)
CREATE TABLE IF NOT EXISTS ChatbotConversations (
    ConversationId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    StartTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    EndTime DATETIME NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Open',
    CONSTRAINT FK_ChatbotConv_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 37. ChatbotMessages (Bảng tin nhắn chatbot)
CREATE TABLE IF NOT EXISTS ChatbotMessages (
    MessageId INT AUTO_INCREMENT PRIMARY KEY,
    ConversationId INT NOT NULL,
    KnowledgeId INT NULL,
    SenderType VARCHAR(20) NOT NULL DEFAULT 'Guest',
    MessageText LONGTEXT NOT NULL,
    MessageTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_CM_Conversations FOREIGN KEY (ConversationId) REFERENCES ChatbotConversations(ConversationId) ON DELETE CASCADE,
    CONSTRAINT FK_CM_Knowledge FOREIGN KEY (KnowledgeId) REFERENCES ChatbotKnowledgeBase(KnowledgeId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 38. LoyaltyPointTransactions (Bảng biến động điểm thành viên)
CREATE TABLE IF NOT EXISTS LoyaltyPointTransactions (
    TransactionId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    TierId INT NULL,
    StayId INT NULL,
    Points INT NOT NULL,
    TransactionType VARCHAR(30) NOT NULL,
    Description VARCHAR(500) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_LPT_Users FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_LPT_Tiers FOREIGN KEY (TierId) REFERENCES MembershipTiers(TierId) ON DELETE SET NULL,
    CONSTRAINT FK_LPT_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 39. MarketingCampaigns (Bảng chiến dịch tiếp thị)
CREATE TABLE IF NOT EXISTS MarketingCampaigns (
    CampaignId INT AUTO_INCREMENT PRIMARY KEY,
    CreatedBy INT NULL,
    TargetUserId INT NULL,
    CampaignName VARCHAR(200) NOT NULL,
    Channel VARCHAR(30) NOT NULL,
    Recipient VARCHAR(200) NOT NULL,
    Content LONGTEXT NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    TargetType VARCHAR(30) NOT NULL DEFAULT 'Guest',
    DeliveryStatus VARCHAR(30) NOT NULL DEFAULT 'Draft',
    SentAt DATETIME NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_MC_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES Users(UserId) ON DELETE SET NULL,
    CONSTRAINT FK_MC_TargetUser FOREIGN KEY (TargetUserId) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 40. MaintenanceTickets (Bảng phiếu bảo trì phòng)
CREATE TABLE IF NOT EXISTS MaintenanceTickets (
    TicketId INT AUTO_INCREMENT PRIMARY KEY,
    RoomId INT NOT NULL,
    ReportedBy INT NULL,
    AssignedTo INT NULL,
    Title VARCHAR(200) NOT NULL,
    Description VARCHAR(2000) NULL,
    Priority VARCHAR(20) NOT NULL DEFAULT 'Medium',
    Status VARCHAR(30) NOT NULL DEFAULT 'Open',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CompletedAt DATETIME NULL,
    CONSTRAINT FK_MT_Rooms FOREIGN KEY (RoomId) REFERENCES Rooms(RoomId),
    CONSTRAINT FK_MT_ReportedBy FOREIGN KEY (ReportedBy) REFERENCES Users(UserId) ON DELETE SET NULL,
    CONSTRAINT FK_MT_AssignedTo FOREIGN KEY (AssignedTo) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 41. LostAndFoundItems (Bảng đồ thất lạc)
CREATE TABLE IF NOT EXISTS LostAndFoundItems (
    LostFoundId INT AUTO_INCREMENT PRIMARY KEY,
    RoomId INT NULL,
    FoundBy INT NULL,
    ClaimedBy INT NULL,
    ItemName VARCHAR(200) NOT NULL,
    Description VARCHAR(2000) NULL,
    FoundDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Location VARCHAR(200) NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Found',
    ClaimedDate DATETIME NULL,
    CONSTRAINT FK_LF_Rooms FOREIGN KEY (RoomId) REFERENCES Rooms(RoomId) ON DELETE SET NULL,
    CONSTRAINT FK_LF_FoundBy FOREIGN KEY (FoundBy) REFERENCES Users(UserId) ON DELETE SET NULL,
    CONSTRAINT FK_LF_ClaimedBy FOREIGN KEY (ClaimedBy) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 42. SmartLockLogs (Bảng lịch sử khóa thông minh)
CREATE TABLE IF NOT EXISTS SmartLockLogs (
    LogId INT AUTO_INCREMENT PRIMARY KEY,
    RoomId INT NOT NULL,
    StayId INT NULL,
    UserId INT NULL,
    DigitalKey VARCHAR(200) NULL,
    ActionType VARCHAR(30) NOT NULL,
    ActionTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(30) NOT NULL DEFAULT 'Success',
    DeviceId VARCHAR(100) NULL,
    CONSTRAINT FK_SLL_Rooms FOREIGN KEY (RoomId) REFERENCES Rooms(RoomId),
    CONSTRAINT FK_SLL_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE SET NULL,
    CONSTRAINT FK_SLL_Users FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 43. CashShifts (Bảng ca thu ngân)
CREATE TABLE IF NOT EXISTS CashShifts (
    ShiftId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    ShiftDate DATE NOT NULL,
    ShiftType VARCHAR(30) NOT NULL,
    OpeningAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    ClosingAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    HandoverAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Status VARCHAR(30) NOT NULL DEFAULT 'Open',
    Note VARCHAR(1000) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_CashShifts_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 44. NightAuditReports (Bảng báo cáo kiểm toán đêm)
CREATE TABLE IF NOT EXISTS NightAuditReports (
    ReportId INT AUTO_INCREMENT PRIMARY KEY,
    ReportDate DATE NOT NULL UNIQUE,
    GeneratedBy INT NULL,
    TotalRevenue DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    TotalBookings INT NOT NULL DEFAULT 0,
    TotalCheckIns INT NOT NULL DEFAULT 0,
    TotalCheckOuts INT NOT NULL DEFAULT 0,
    OccupancyRate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    RevPAR DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Status VARCHAR(30) NOT NULL DEFAULT 'Completed',
    Note VARCHAR(2000) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_NAR_Users FOREIGN KEY (GeneratedBy) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 45. Vehicles (Bảng xe đưa đón)
CREATE TABLE IF NOT EXISTS Vehicles (
    VehicleId INT AUTO_INCREMENT PRIMARY KEY,
    BranchName VARCHAR(200) NOT NULL DEFAULT 'Chi nhánh chính',
    PlateNumber VARCHAR(30) NOT NULL UNIQUE,
    VehicleType VARCHAR(50) NOT NULL,
    SeatCapacity INT NOT NULL DEFAULT 4,
    DriverName VARCHAR(150) NULL,
    DriverPhone VARCHAR(30) NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Available',
    Description VARCHAR(500) NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 46. ShuttleSchedules (Bảng lịch xe đưa đón)
CREATE TABLE IF NOT EXISTS ShuttleSchedules (
    ShuttleScheduleId INT AUTO_INCREMENT PRIMARY KEY,
    VehicleId INT NOT NULL,
    BookingId INT NULL,
    UserId INT NULL,
    Route VARCHAR(300) NOT NULL,
    DepartureTime DATETIME NOT NULL,
    ArrivalTime DATETIME NOT NULL,
    PassengerCount INT NOT NULL DEFAULT 1,
    Status VARCHAR(30) NOT NULL DEFAULT 'Scheduled',
    Note VARCHAR(500) NULL,
    CONSTRAINT FK_SS_Vehicles FOREIGN KEY (VehicleId) REFERENCES Vehicles(VehicleId),
    CONSTRAINT FK_SS_Bookings FOREIGN KEY (BookingId) REFERENCES Bookings(BookingId) ON DELETE SET NULL,
    CONSTRAINT FK_SS_Users FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 47. PoliceDeclarations (Bảng khai báo lưu trú công an)
CREATE TABLE IF NOT EXISTS PoliceDeclarations (
    DeclarationId INT AUTO_INCREMENT PRIMARY KEY,
    StayId INT NOT NULL,
    GuestName VARCHAR(150) NOT NULL,
    IdNumber VARCHAR(50) NOT NULL,
    IdType VARCHAR(30) NOT NULL,
    Nationality VARCHAR(100) NOT NULL DEFAULT 'Việt Nam',
    DeclarationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    ExportedAt DATETIME NULL,
    CONSTRAINT FK_PD_Stays FOREIGN KEY (StayId) REFERENCES Stays(StayId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 48. BanquetEvents (Bảng sự kiện hội nghị/tiệc)
CREATE TABLE IF NOT EXISTS BanquetEvents (
    EventId INT AUTO_INCREMENT PRIMARY KEY,
    BookingId INT NULL,
    CreatedBy INT NULL,
    EventName VARCHAR(200) NOT NULL,
    EventType VARCHAR(50) NOT NULL,
    EventDate DATE NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    Venue VARCHAR(200) NOT NULL,
    GuestCount INT NOT NULL DEFAULT 50,
    Revenue DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    Note VARCHAR(1000) NULL,
    CONSTRAINT FK_BE_Bookings FOREIGN KEY (BookingId) REFERENCES Bookings(BookingId) ON DELETE SET NULL,
    CONSTRAINT FK_BE_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 49. StaffSchedules (Bảng lịch làm việc nhân viên)
CREATE TABLE IF NOT EXISTS StaffSchedules (
    ScheduleId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    BranchName VARCHAR(200) NOT NULL DEFAULT 'Chi nhánh chính',
    WorkDate DATE NOT NULL,
    Shift VARCHAR(30) NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Scheduled',
    CheckInTime DATETIME NULL,
    CheckOutTime DATETIME NULL,
    Note VARCHAR(500) NULL,
    CONSTRAINT FK_StaffSchedules_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 50. AuditLogs (Bảng nhật ký hệ thống)
CREATE TABLE IF NOT EXISTS AuditLogs (
    LogId BIGINT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NULL,
    ActionType VARCHAR(50) NOT NULL,
    TableName VARCHAR(128) NOT NULL,
    RecordId INT NULL,
    OldValues LONGTEXT NULL,
    NewValues LONGTEXT NULL,
    ActionTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    IpAddress VARCHAR(50) NULL,
    CONSTRAINT FK_AuditLogs_Users FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

