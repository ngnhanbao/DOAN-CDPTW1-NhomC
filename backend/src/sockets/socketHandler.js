/**
 * Cấu hình các sự kiện WebSocket Real-time bằng Socket.IO
 * @param {import('socket.io').Server} io 
 */
function setupSockets(io) {
  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client kết nối: ${socket.id}`);

    // Tham gia phòng theo vai trò (ví dụ: 'kitchen', 'receptionist', 'housekeeping')
    socket.on('joinRoom', (roomName) => {
      socket.join(roomName);
      console.log(`[Socket.IO] ${socket.id} đã tham gia phòng: ${roomName}`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client ngắt kết nối: ${socket.id}`);
    });
  });
}

module.exports = { setupSockets };

