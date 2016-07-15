const usersRooms = require('../../models/users_rooms');
const Chat = require('./chat');
const Canvas = require('./canvas');

class SocketIOOperation {
  constructor(io, socket, isSuccess, rooms) {
    this.io = io;
    this.socket = socket;
    this.idStore = {};

    this.chat = new Chat(this.io, this.socket, this.sendError);
    this.canvas = new Canvas(this.io, this.socket, rooms);

    this.init(isSuccess);
  }

  init(isSuccess) {
    if (!isSuccess) {
      this.sendError();
    }
  }

  sendError(err) {
    this.io.to(this.socket.id).emit('error', err);
  }

  subscribeEvents() {
    this.socket.on('enterRoom', ::this.onEnterRoom);
    this.socket.on('disconnect', ::this.onExitRoom);
    this.socket.on('exitRoom', ::this.onExitRoom);
  }

  onEnterRoom(payload) {
    const user = payload.user;
    const room = payload.room;

    usersRooms.add(user.id, room.id)
    .then(() => {
      this.addUserToStore(user, room);
      this.chat.sendRecentlyMessage(room)
      .then(() => {
        this.chat.sendEnterChat(room, user);
      });
      this.canvas.addUser(room, user);
    })
    .catch(err => {
      this.sendError(err);
    });
  }

  addUserToStore(user, room) {
    this.idStore[this.socket.id] = { user, room };
    this.socket.join(room.roomId);
  }

  onExitRoom() {
    if (this.idStore[this.socket.id]) {
      const store = this.idStore[this.socket.id];

      usersRooms.deleteByUserId(store.user.id)
      .then(() => {
        this.canvas.removeUser(store.room, store.user);
        this.removeUserFromStore(store);
        this.chat.sendExitChat(store);
      })
      .catch(() => {
        this.sendError();
      });
    }
  }

  removeUserFromStore(store) {
    this.socket.leave(store.room.roomId);
    Reflect.deleteProperty(this.idStore, this.socket.id);
  }
}

module.exports = SocketIOOperation;
