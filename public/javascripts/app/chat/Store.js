import events from 'events';

export default class Store extends events.EventEmitter {
  constructor() {
    super();
    this.chatList = [];
  }

  init(socket, user, dispatcher) {
    this.socket = socket;
    this.userName = user.name;
    this.userId = user.id;

    dispatcher.on('connectChat', this.passChat.bind(this, '入室'));
    dispatcher.on('disconnectChat', this.passChat.bind(this, '退室'));
    dispatcher.on('sendMessage', this.sendMessage.bind(this));
    dispatcher.on('receiveMessage', this.addChatList.bind(this));
  }

  getChatList() {
    return this.chatList;
  }

  addChatList(data) {
    this.chatList = [
      ...this.chatList,
      data
    ];
    this.emit('addChatList');
  }

  passChat(type) {
    this.socket.emit('message', {
      userId: this.userId,
      msg: `${this.userName}が${type}しました`
    });
  }

  sendMessage(data) {
    this.socket.emit('message', {
      userId: this.userId,
      msg: `${this.userName}: ${data}`
    });
  }
}
