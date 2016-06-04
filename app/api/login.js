const Boom = require('boom');
const uuid = require('node-uuid');
const encrypt = require('../encrypt');
const execute = require('../mysqlConnection');

let loginUsers = [];

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

        const sid = uuid.v4();
        loginUsers.push({
          sid,
          id: results[0].id
        });

        return reply([Object.assign({}, results[0], { sid })]);
      })
      .catch(err => reply(Boom.badImplementation(String(err))));
    }
  },
  {
    path: '/api/session/{sid*}',
    method: 'GET',
    handler: (request, reply) => {
      const sid = request.params.sid.split('/')[0];
      const loginUserId = loginUsers.filter(user => user.sid === sid)[0].id;

      if (loginUserId) {
        return reply([loginUserId]);
      }

      return reply(Boom.badImplementation('loginUserId is not found'));
    }
  },
  {
    path: '/api/session/',
    method: 'POST',
    handler: (request, reply) => {
      const sid = request.payload.sid;
      const id = request.payload.id;
      const loginUserId = loginUsers.filter(user => user.sid === sid)[0].id;

      if (loginUserId === id) {
        const query = `
          SELECT
            id, user_id, name, password, mail
          FROM
           users
          WHERE
            id = "${id}"`;

        return execute(query)
        .then(results => {
          if (!results.length) {
            return reply(Boom.badImplementation('Invalid error'));
          }

          return reply(results);
        })
        .catch(err => reply(Boom.badImplementation(err)));
      }

      return reply(Boom.badImplementation('Invalid error'));
    }
  },
  {
    path: '/api/session/{id*}',
    method: 'DELETE',
    handler: (request, reply) => {
      const id = request.params.id.split('/')[0];

      loginUsers = loginUsers.filter(user => user.id !== id);

      return reply.continue();
    }
  }
];
