/**
 * WebSocket Export
 * Exports WebSocket functionality
 */

const { initializeWebSocket, emitToUser, emitToProject, emitToAll } = require('./infrastructure/websocket/server');

module.exports = {
  initializeWebSocket,
  emitToUser,
  emitToProject,
  emitToAll
};
