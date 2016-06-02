const Boom = require('boom');
const moment = require('moment');
const encrypt = require('../encrypt');
const execute = require('../mysqlConnection');

const query = {
  fetchUserByUserId: userId => `
    SELECT
      *
    FROM
      users
    WHERE
      user_id = "${userId}"`,
  fetchUserByMail: mail => `
    SELECT
      *
    FROM
      users
    WHERE
      mail = "${mail}"`,
  registerUser: payload => {
    const current = moment().format('YYYY-MM-DD HH:mm:ss');

    return `
      INSERT INTO
        users (user_id, name, password, mail, created_at, updated_at)
      VALUES
        ("${payload.userId}", "${payload.name}", "${encrypt(payload.pass)}", "${payload.mail}", "${current}", "${current}")`;
  }
};

module.exports = [
  {
    path: '/api/users/',
    method: 'POST',
    handler: (request, reply) => {
      const payload = request.payload;

      Promise.all([
        execute(query.fetchUserByUserId(payload.userId)),
        execute(query.fetchUserByMail(payload.mail))
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

        return execute(query.registerUser(payload));
      })
      .then(res => reply(res))
      .catch(err => reply(Boom.badImplementation(String(err))));
    }
  }
];
