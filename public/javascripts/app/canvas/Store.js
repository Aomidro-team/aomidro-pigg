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

    dispatcher.on('connectCanvas', this.addSelf.bind(this, user));
    dispatcher.on('setSelfGoalPos', this.changeSelfGoalPos.bind(this, user));
    dispatcher.on('updateCurrentPos', this.updateCurrentPos.bind(this));
  }

  getUsers() {
    return this.users;
  }

  addSelf(user, initPos) {
    this.addUser(Object.assign({}, this.userTemp, {
      id: user.id,
      name: user.name,
      current: initPos,
      goal: initPos
    }));
  }

  addUser(user) {
    this.users = [
      ...this.users,
      user
    ];
    this.emit('addUser');
  }

  changeSelfGoalPos(user, pos) {
    this.changePos(Object.assign({}, this.getSelf(), {
      goal: pos
    }));
  }

  getSelf() {
    return this.users.filter(user => user.id === this.selfId)[0];
  }

  changePos(changedUser) {
    this.users = this.users.map(user => {
      if (user.id === changedUser.id) {
        return changedUser;
      }

      return user;
    });

    this.emit('changePos');
  }

  updateCurrentPos(user) {
    this.changePos(user);
  }
}
