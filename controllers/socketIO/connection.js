const socektIo = require('socket.io');
const socketioJwt = require('socketio-jwt');
const config = require('config');
const users = require('../../models/users');
const SocketIOOperation = require('./controller');

const socketIOConnection = listener => {
  const io = socektIo(listener);

  io.sockets.on('connection', socketioJwt.authorize({
    secret: config.get('secretKey'),
    timeout: 15000
  }))
  .on('authenticated', socket => {
    users.getById(socket.decoded_token.id)
    .then(results => results.length !== 0)
    .catch(() => false)
    .then(isSuccess => {
      const socketIOOperation = new SocketIOOperation(io, socket, isSuccess);
      socketIOOperation.subscribeEvents();
    });
  });
};

module.exports = socketIOConnection;
