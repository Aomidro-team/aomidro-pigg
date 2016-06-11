const Boom = require('boom');
const users = require('../../models/users');

module.exports = [
  {
    path: '/api/users/',
    method: 'POST',
    handler: (request, reply) => {
      const payload = request.payload;

      Promise.all([
        users.getByUserId(payload.userId),
        users.getByMail(payload.mail)
      ])
      .then(res => {
        const userIdIsExist = res[0].length !== 0;
        const mailIsExist = res[1].length !== 0;

        if (userIdIsExist || mailIsExist) {
          let errMsg;
          let replyMsg;

          if (userIdIsExist && mailIsExist) {
            errMsg = 'userId and mail are already exist';
            replyMsg = '入力されたユーザー名とメールアドレスは既に使われています。';
          } else if (userIdIsExist) {
            errMsg = 'userId is already exist';
            replyMsg = '入力されたユーザー名は既に使われています。';
          } else if (mailIsExist) {
            errMsg = 'mail is already exist';
            replyMsg = '入力されたメールアドレスは既に使われています。';
          }

          const err = Boom.badImplementation(errMsg, {
            message: replyMsg
          });
          err.output.payload = Object.assign({}, err.output.payload, err.data);

          return reply(err);
        }

        return users.add(payload);
      })
      .then(res => reply(res))
      .catch(err => reply(Boom.badImplementation(String(err))));
    }
  }
];
