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
    .then(results => ({
      isSuccess: true,
      res: results[0]
    }))
    .catch(err => ({
      isSuccess: false,
      res: err
    }))
    .then(status => {
      const socketIOOperation = new SocketIOOperation(io, socket, status);
      socketIOOperation.subscribeEvents();
    });
  });
};

module.exports = socketIOConnection;
