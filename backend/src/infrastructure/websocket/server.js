/**
 * WebSocket Server
 */

const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/env');

let io;

const initializeWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    },
  });

  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.userId = decoded.id;
      socket.userEmail = decoded.email;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.userEmail} (${socket.id})`);

    // Join user's personal room
    socket.join(`user:${socket.userId}`);

    // Join project rooms
    socket.on('join:project', (projectId) => {
      socket.join(`project:${projectId}`);
    });

    // Leave project rooms
    socket.on('leave:project', (projectId) => {
      socket.leave(`project:${projectId}`);
    });

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.userEmail}`);
    });
  });

  return io;
};

const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
  }
};

const emitToProject = (projectId, event, data) => {
  if (io) {
    io.to(`project:${projectId}`).emit(event, data);
  }
};

const emitToAll = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};

module.exports = {
  initializeWebSocket,
  emitToUser,
  emitToProject,
  emitToAll,
  getIO: () => io,
};
