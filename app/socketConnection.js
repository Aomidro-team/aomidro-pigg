const socektIo = require('socket.io');
const socketioJwt = require('socketio-jwt');
const config = require('config');
const moment = require('moment');
const connection = require('./mysqlConnection');

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
    this.socket.on('message', this.onReceiveMsg.bind(this));
    this.socket.on('changeIsInputing', this.changeIsInputing.bind(this));

    this.socket.on('addUser', this.addUser.bind(this));
    this.socket.on('disconnectCanvas', this.removeUser.bind(this));
    this.socket.on('updateGoalPos', this.updateGoalPos.bind(this));
  }

  onReceiveMsg(value) {
    const current = moment().format('YYYY-MM-DD HH:mm:ss');
    const query = `
      INSERT INTO
        messages
          (user_id, content, created_at, updated_at)
        VALUES
          ("${value.userId}", "${value.msg}", "${current}", "${current}")`;

    connection.query(query, (err, results) => {
      if (err) {
        throw err;
      }

      this.io.sockets.emit('message', Object.assign({}, value, {
        msgId: results.insertId
      }));
    });
  }

  changeIsInputing(user) {
    this.socket.broadcast.emit('changeIsInputing', user);
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
