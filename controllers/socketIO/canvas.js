class Canvas {
  constructor(io, socket, rooms) {
    this.io = io;
    this.socket = socket;
    this.rooms = rooms;

    this._subscribeEvents();
  }

  _subscribeEvents() {
    this.socket.on('updateGoalPos', ::this._onUpdateGoalPos);
  }

  addUser(room, user) {
    if (!this.rooms[room.roomId]) {
      this.rooms[room.roomId] = {};
      this.rooms[room.roomId].users = [];
    }

    this.rooms[room.roomId].users = [
      ...this.rooms[room.roomId].users,
      Object.assign({}, user, {
        current: null,
        goal: null
      })
    ];

    this.io.sockets.in(room.roomId).emit('changeUsers', this.rooms[room.roomId].users);
  }

  removeUser(room, user) {
    this.rooms[room.roomId].users = this.rooms[room.roomId].users.filter(item => item.id !== user.id);

    this.io.sockets.in(room.roomId).emit('changeUsers', this.rooms[room.roomId].users);
  }

  _onUpdateGoalPos(payload) {
    const { room, user, goal } = payload;
    let changedUser;

    this.rooms[room.roomId].users = this.rooms[room.roomId].users.map(item => {
      if (item.id === user.id) {
        changedUser = Object.assign({}, item, {
          current: goal,
          goal
        });

        return changedUser;
      }

      return item;
    });

    this.io.sockets.in(room.roomId).emit('newGoalPos', changedUser);
  }
}

module.exports = Canvas;
