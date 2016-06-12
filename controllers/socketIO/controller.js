class SocketIOOperation {
  constructor(io, socket, status) {
    this.io = io;
    this.socket = socket;

    this.init(status);
  }

  init(status) {
    if (status.isSuccess) {
      console.log(status.res);
      // this.sendMessage({
      //   range: 'all',
      //   content: `${status.res}が入室しました。`
      // });
    } else {
      console.log('error');
    }
    // if (!results.length) {
    //   const err = Boom.badImplementation('userId or password is not found', {
    //     message: '入力されたユーザー名やパスワードが正しくありません。確認してからやりなおしてください。'
    //   });
    //   err.output.payload = Object.assign({}, err.output.payload, err.data);
    //
    //   return reply(err);
    // }
    // const account = results[0];
    // const jsonWebToken = jwt.sign({
    //   id: account.id,
    //   mail: account.mail
    // }, secretKey);
    //
    // return reply([Object.assign({}, account, { jsonWebToken })]);
  }

  subscribeEvents() {

  }

  sendMessage(val) {
    const { range, content } = val;

    switch (range) {
      case 'all':
        this.io.sockets.emit('message', content);
        break;

      default:
        break;
    }
  }
}

module.exports = SocketIOOperation;
// export default class SocketCallbacks {
//   events() {
//     this.socket.on('connectChat', this.onConnectChat.bind(this));
//     this.socket.on('message', this.onReceiveMsg.bind(this));
//     this.socket.on('changeIsInputing', this.changeIsInputing.bind(this));
//
//     this.socket.on('addUser', this.addUser.bind(this));
//     this.socket.on('disconnectCanvas', this.removeUser.bind(this));
//     this.socket.on('updateGoalPos', this.updateGoalPos.bind(this));
//   }
//
//   onConnectChat(value) {
//     this.insertMsg(value.userId, value.msg)
//     .then(async res => {
//       const msgs = await this.fetchRecentlyMsg();
//
//       this.io.to(this.socket.id).emit('sendRecentlyMsg', msgs.reverse().map(msg => ({
//         msgId: msg.id,
//         msg: msg.content
//       })));
//       this.socket.broadcast.emit('message', Object.assign({}, value, {
//         msgId: res.insertId
//       }));
//     })
//     .catch(err => {
//       throw err;
//     });
//   }
//
//   onReceiveMsg(value) {
//     this.insertMsg(value.userId, value.msg)
//     .then(res => {
//       this.io.sockets.emit('message', Object.assign({}, value, {
//         msgId: res.insertId
//       }));
//     })
//     .catch(err => {
//       throw err;
//     });
//   }
//
//   insertMsg(userId, msg) {
//     return new Promise((resolve, reject) => {
//       const current = moment().format('YYYY-MM-DD HH:mm:ss');
//       const query = `
//         INSERT INTO
//           messages
//             (user_id, content, created_at, updated_at)
//           VALUES
//             ("${userId}", "${msg}", "${current}", "${current}")`;
//
//       connection.query(query, (err, results) => {
//         if (err) {
//           reject(err);
//         }
//
//         resolve(results);
//       });
//     });
//   }
//
//   fetchRecentlyMsg() {
//     return new Promise((resolve, reject) => {
//       const query = `
//         SELECT
//           id, content
//         FROM
//           messages
//         ORDER BY
//           created_at DESC
//         LIMIT 50`;
//
//       connection.query(query, (err, results) => {
//         if (err) {
//           reject(err);
//         }
//
//         resolve(results);
//       });
//     });
//   }
//
//   changeIsInputing(user) {
//     this.socket.broadcast.emit('changeIsInputing', user);
//   }
//
//   addUser(user) {
//     users = [
//       ...users,
//       user
//     ];
//
//     this.io.to(this.socket.id).emit('sendAllUser', users);
//     this.socket.broadcast.emit('addUser', user);
//   }
//
//   removeUser(leavedUser) {
//     users = users.filter(user => user.id !== leavedUser.id);
//
//     this.io.sockets.emit('removeUser', leavedUser);
//   }
//
//   updateGoalPos(changedUser) {
//     users = users.map(user => {
//       if (user.id === changedUser.id) {
//         return Object.assign({}, user, {
//           current: changedUser.goal,
//           goal: changedUser.goal
//         });
//       }
//
//       return user;
//     });
//
//     this.io.sockets.emit('newGoalPos', changedUser);
//   }
// }
