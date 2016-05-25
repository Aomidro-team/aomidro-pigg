import events from 'events';

export default class Store extends events.EventEmitter {
  constructor() {
    super();

    this.userTemp = {
      name: '',
      current: {
        x: 0,
        y: 0
      },
      goal: {
        x: 0,
        y: 0
      },
      speed: 5
    };
    this.users = [];
  }

  init(socket, user, dispatcher) {
    this.socket = socket;
    this.selfId = user.id;

    dispatcher.on('connectCanvas', this.sendSelf.bind(this, user));
    dispatcher.on('disconnectCanvas', this.disconnectCanvas.bind(this, user));
    dispatcher.on('setSelfGoalPos', this.sendSelfNewGoalPos.bind(this, user));
    dispatcher.on('updateCurrentPos', this.updateCurrentPos.bind(this));
    dispatcher.on('receiveUser', this.addUser.bind(this));
    dispatcher.on('removeUser', this.removeUser.bind(this));
    dispatcher.on('receiveGoalPos', this.changePos.bind(this));
  }

  getUsers() {
    return this.users;
  }

  sendSelf(user, initPos) {
    this.socket.emit('addUser', Object.assign({}, this.userTemp, {
      id: user.id,
      name: user.name,
      current: initPos,
      goal: initPos
    }));
  }

  disconnectCanvas() {
    this.socket.emit('disconnectCanvas', this.getSelf());
  }

  addUser(user) {
    this.users = [
      ...this.users,
      user
    ];
    this.emit('changeUsers');
  }

  removeUser(leavedUser) {
    this.users = this.users.filter(user => user.id !== leavedUser.id);
    this.emit('changeUsers');
  }

  sendSelfNewGoalPos(user, pos) {
    this.socket.emit('updateGoalPos', {
      id: user.id,
      goal: pos
    });
  }

  getSelf() {
    return this.users.filter(user => user.id === this.selfId)[0];
  }

  changePos(changedUser) {
    this.users = this.users.map(user => {
      if (user.id === changedUser.id) {
        return Object.assign({}, user, changedUser);
      }

      return user;
    });

    this.emit('changePos');
  }

  updateCurrentPos(user) {
    this.changePos(user);
  }
}
