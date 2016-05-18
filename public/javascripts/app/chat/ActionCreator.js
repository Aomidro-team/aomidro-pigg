export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  connectChat() {
    this.dispatcher.emit('connectChat');
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
}
