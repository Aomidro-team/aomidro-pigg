export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  connectChat() {
    this.dispatcher.emit('connectChat');
  }

  sendRecentlyMsg(value) {
    this.dispatcher.emit('sendRecentlyMsg', value);
  }

  disconnectChat() {
    this.dispatcher.emit('disconnectChat');
  }

  sendMessage(data) {
    this.dispatcher.emit('sendMessage', data);
  }

  receiveMessage(data) {
    this.dispatcher.emit('receiveMessage', data);
  }

  sendIsInputing(isInputing) {
    this.dispatcher.emit('sendIsInputing', isInputing);
  }

  receiveIsInputing(user) {
    this.dispatcher.emit('receiveIsInputing', user);
  }
}