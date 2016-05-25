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
    this.socket.on('connectChat', this.onConnectChat.bind(this));
    this.socket.on('message', this.onReceiveMsg.bind(this));
    this.socket.on('changeIsInputing', this.changeIsInputing.bind(this));

    this.socket.on('addUser', this.addUser.bind(this));
    this.socket.on('disconnectCanvas', this.removeUser.bind(this));
    this.socket.on('updateGoalPos', this.updateGoalPos.bind(this));
  }

  onConnectChat(value) {
    this.insertMsg(value.userId, value.msg)
    .then(async res => {
      const msgs = await this.fetchRecentlyMsg();

      this.io.to(this.socket.id).emit('sendRecentlyMsg', msgs.reverse().map(msg => ({
        msgId: msg.id,
        msg: msg.content
      })));
      this.socket.broadcast.emit('message', Object.assign({}, value, {
        msgId: res.insertId
      }));
    })
    .catch(err => {
      throw err;
    });
  }

  onReceiveMsg(value) {
    this.insertMsg(value.userId, value.msg)
    .then(res => {
      this.io.sockets.emit('message', Object.assign({}, value, {
        msgId: res.insertId
      }));
    })
    .catch(err => {
      throw err;
    });
  }

  insertMsg(userId, msg) {
    return new Promise((resolve, reject) => {
      const current = moment().format('YYYY-MM-DD HH:mm:ss');
      const query = `
        INSERT INTO
          messages
            (user_id, content, created_at, updated_at)
          VALUES
            ("${userId}", "${msg}", "${current}", "${current}")`;

      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  fetchRecentlyMsg() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT
          id, content
        FROM
          messages
        ORDER BY
          created_at DESC
        LIMIT 50`;

      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
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
