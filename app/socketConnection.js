const socektIo = require('socket.io');
const socketioJwt = require('socketio-jwt');
const config = require('config');

const socketConnection = server => {
  const io = socektIo(server);

  io.set('authorization', socketioJwt.authorize({
    secret: config.get('authenticate').secret,
    handshake: true
  }));

  io.sockets.on('connection', socket => {
    socket.on('hoge', msg => {
      socket.broadcast.emit('hoge', msg);
    });
  });
};

module.exports = socketConnection;
