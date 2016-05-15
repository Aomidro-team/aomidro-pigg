const socektIo = require('socket.io');
const socketioJwt = require('socketio-jwt');
const config = require('config');

const socketConnection = server => {
  const io = socektIo(server);

  io.set('authorization', socketioJwt.authorize({
    secret: config.get('auth').secret,
    handshake: true
  }));

  io.sockets.on('connection', socket => {
    const socketCallbacks = new SocketCallbacks(socket, io);

    socketCallbacks.events();
  });
};

class SocketCallbacks {
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
  }

  events() {
    this.socket.on('message', this.returnToEntire.bind(this));
  }

  returnToEntire(value) {
    this.io.sockets.emit('message', value);
  }
}

module.exports = socketConnection;
