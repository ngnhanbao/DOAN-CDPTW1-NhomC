const http = require('http');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();

const app = require('./app');
const { connectDB } = require('./config/db');
const { setupSockets } = require('./sockets/socketHandler');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Khởi tạo Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }
});

// Lưu instance io vào Express app để controller có thể gọi emit
app.set('io', io);
setupSockets(io);

// Khởi động Server
async function startServer() {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Hotel Management Backend đang chạy tại PORT: ${PORT}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    console.log(`⚡ WebSocket: ws://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

startServer();

