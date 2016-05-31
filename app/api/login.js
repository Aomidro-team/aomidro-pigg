const Boom = require('boom');
const encrypt = require('../encrypt');
const execute = require('../mysqlConnection');

module.exports = [
  {
    path: '/api/login/',
    method: 'POST',
    handler: (request, reply) => {
      const userId = request.payload.userId;
      const pass = encrypt(request.payload.pass);
      const query = `
        SELECT
          id, user_id, name, password, mail
        FROM
         users
        WHERE
          user_id = "${userId}"
        AND
          password = "${pass}"
        AND
          deleted_at IS NULL`;

      execute(query)
      .then(results => {
        if (!results.length) {
          const err = Boom.badImplementation('userId or password is not found', {
            message: '入力されたユーザー名やパスワードが正しくありません。確認してからやりなおしてください。'
          });
          err.output.payload = Object.assign({}, err.output.payload, err.data);

          return reply(err);
        }

        return reply(results);
      })
      .catch(err => {
        throw err;
      });
    }
  }
];
