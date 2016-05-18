export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  connectCanvas(initPos) {
    this.dispatcher.emit('connectCanvas', initPos);
  }

  setSelfGoalPos(pos) {
    this.dispatcher.emit('setSelfGoalPos', pos);
  }

  updateCurrentPos(user) {
    this.dispatcher.emit('updateCurrentPos', user);
  }
}
