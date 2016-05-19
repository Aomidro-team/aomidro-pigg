export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  connectCanvas(initPos) {
    this.dispatcher.emit('connectCanvas', initPos);
  }

  disconnectCanvas() {
    this.dispatcher.emit('disconnectCanvas');
  }

  setSelfGoalPos(pos) {
    this.dispatcher.emit('setSelfGoalPos', pos);
  }

  updateCurrentPos(user) {
    this.dispatcher.emit('updateCurrentPos', user);
  }

  receiveUsers(users) {
    users.forEach(user => {
      this.dispatcher.emit('receiveUser', user);
    });
  }

  receiveUser(user) {
    this.dispatcher.emit('receiveUser', user);
  }

  removeUser(user) {
    this.dispatcher.emit('removeUser', user);
  }

  receiveGoalPos(user) {
    this.dispatcher.emit('receiveGoalPos', user);
  }
}
