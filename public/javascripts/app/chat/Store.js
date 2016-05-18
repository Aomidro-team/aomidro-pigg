import events from 'events';

export default class Store extends events.EventEmitter {
  constructor() {
    super();
    this.chatList = [];
  }

  init(socket, userName, dispatcher) {
    this.socket = socket;
    this.userName = userName;

    dispatcher.on('connectChat', this.passChat.bind(this, '入室'));
    dispatcher.on('disconnectChat', this.passChat.bind(this, '退室'));
    dispatcher.on('sendMessage', this.sendMessage.bind(this));
    dispatcher.on('receiveMessage', this.addChatList.bind(this));
  }

  getChatList() {
    return this.chatList;
  }

  addChatList(data) {
    this.chatList.push(data.msg);
    this.emit('addChatList');
  }

  passChat(type) {
    this.socket.emit('message', { msg: `${this.userName}が${type}しました` });
  }

  sendMessage(data) {
    this.socket.emit('message', { msg: `${this.userName}: ${data}` });
  }
}
