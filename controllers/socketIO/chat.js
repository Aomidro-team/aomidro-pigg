const uuid = require('node-uuid');
const messages = require('../../models/messages');

class Chat {
  constructor(io, socket, sendError) {
    this.io = io;
    this.socket = socket;
    this.sendError = sendError;

    this._subscribeEvents();
  }

  _subscribeEvents() {
    this.socket.on('message', ::this._onReceiveMessage);
    this.socket.on('changeIsInputing', ::this._onChangeIsInputing);
  }

  sendRecentMessage(room) {
    return new Promise(async resolve => {
      const recentMessage = await messages.getMesseageByRoomId(room.id, 50);

      this._sendMessage({
        range: 'self',
        event: 'recentMessage',
        body: recentMessage.reverse().map(item => ({
          id: item.message_id,
          content: `${item.user_id}: ${item.content}`,
          user: {
            id: item.id,
            userId: item.user_id,
            name: item.name
          }
        }))
      });
      resolve();
    });
  }

  sendEnterChat(room, user) {
    this._sendMessage({
      range: 'room',
      event: 'messages.new',
      roomId: room.roomId,
      body: {
        id: uuid.v4().split('-').join(''),
        content: `${user.userId}が入室しました`,
        user
      }
    });
  }

  sendExitChat(store) {
    this._sendMessage({
      range: 'room',
      event: 'messages.new',
      roomId: store.room.roomId,
      body: {
        id: uuid.v4().split('-').join(''),
        content: `${store.user.userId}が退室しました`,
        user: store.user
      }
    });
  }

  _onReceiveMessage(payload) {
    const { room, user, content } = payload;

    messages.add(room.id, user.id, content)
    .then(res => {
      this._sendMessage({
        range: 'room',
        event: 'messages.new',
        roomId: room.roomId,
        body: {
          id: res.insertId,
          content: `${user.userId}: ${content}`,
          user
        }
      });
    })
    .catch(err => {
      this.sendError(err);
    });
  }

  _onChangeIsInputing(payload) {
    this._sendMessage({
      range: 'roomExceptSelf',
      event: 'changeIsInputing',
      roomId: payload.room.roomId,
      body: {
        isInputing: payload.isInputing,
        user: payload.user
      }
    });
  }

  _sendMessage(val) {
    const { range, event, body } = val;

    switch (range) {
      case 'all':
        this.io.sockets.emit(event, body);
        break;

      case 'room':
        this.io.sockets.in(val.roomId).emit(event, body);
        break;

      case 'roomExceptSelf':
        this.socket.broadcast.to(val.roomId).emit(event, body);
        break;

      case 'self':
        this.io.to(this.socket.id).emit(event, body);
        break;

      default:
        break;
    }
  }
}

module.exports = Chat;
