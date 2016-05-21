import events from 'events';

export default class Store extends events.EventEmitter {
  constructor() {
    super();
    this.chatList = [];
    this.inputingUsers = [];
  }

  init(socket, user, dispatcher) {
    this.socket = socket;
    this.userName = user.name;
    this.userId = user.id;

    dispatcher.on('connectChat', this.passChat.bind(this, '入室'));
    dispatcher.on('disconnectChat', this.passChat.bind(this, '退室'));
    dispatcher.on('sendMessage', this.sendMessage.bind(this));
    dispatcher.on('receiveMessage', this.addChatList.bind(this));
    dispatcher.on('sendIsInputing', this.sendIsInputing.bind(this));
    dispatcher.on('receiveIsInputing', this.receiveIsInputing.bind(this));
  }

  getChatList() {
    return this.chatList;
  }

  getInputingUsers() {
    return this.inputingUsers;
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

  sendIsInputing(isInputing) {
    this.socket.emit('changeIsInputing', {
      name: this.userName,
      isInputing
    });
  }

  receiveIsInputing(changedUser) {
    this.inputingUsers = changedUser.isInputing ? [...this.inputingUsers.filter(user => user !== changedUser.name), changedUser.name] : this.inputingUsers.filter(user => user !== changedUser.name);
    this.emit('changeInputingUsers');
  }
}
