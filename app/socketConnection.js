const socektIo = require('socket.io');
const socketioJwt = require('socketio-jwt');
const config = require('config');

let users = [];

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
    this.socket.on('message', this.returnMsgToEntire.bind(this));
    this.socket.on('addUser', this.addUser.bind(this));
    this.socket.on('disconnectCanvas', this.removeUser.bind(this));
    this.socket.on('updateGoalPos', this.updateGoalPos.bind(this));
  }

  returnMsgToEntire(value) {
    this.io.sockets.emit('message', value);
  }

  addUser(user) {
    users = [
      ...users,
      user
    ];

    this.io.to(this.socket.id).emit('sendAllUser', users);
    this.socket.broadcast.emit('addUser', user);
  }

  removeUser(leavedUser) {
    users = users.filter(user => user.id !== leavedUser.id);

    this.io.sockets.emit('removeUser', leavedUser);
  }

  updateGoalPos(changedUser) {
    users = users.map(user => {
      if (user.id === changedUser.id) {
        return Object.assign({}, user, {
          current: changedUser.goal,
          goal: changedUser.goal
        });
      }

      return user;
    });

    this.io.sockets.emit('newGoalPos', changedUser);
  }
}

module.exports = socketConnection;
