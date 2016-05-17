export default class Store {
  constructor() {
    this.chatList = [];
  }

  init(socket, userName, dispatcher) {
    this.socket = socket;
    this.userName = userName;
    this.dispatcher = dispatcher;

    this.socket.on('message', this.addChatList.bind(this));
    this.dispatcher.on('connectChat', this.passChat.bind(this, '入室'));
    this.dispatcher.on('disconnectChat', this.passChat.bind(this, '退室'));
    this.dispatcher.on('sendMessage', this.sendMessage.bind(this));
  }

  getChatList() {
    return this.chatList;
  }

  addChatList(data) {
    this.chatList.push(data.msg);
    this.dispatcher.emit('addChatList');
  }

  passChat(type) {
    this.socket.emit('message', { msg: `${this.userName}が${type}しました` });
  }

  sendMessage(data) {
    this.socket.emit('message', { msg: `${this.userName}: ${data}` });
  }
}
