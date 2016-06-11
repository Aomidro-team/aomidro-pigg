const Boom = require('boom');
const secretKey = require('config').get('secretKey');
const users = require('../../models/users');

module.exports = jwt => [
  {
    path: '/api/login/',
    method: 'POST',
    handler: (request, reply) => {
      const userId = request.payload.userId;
      const pass = request.payload.pass;

      users.getByUserIdAndPass(userId, pass)
      .then(results => {
        if (!results.length) {
          const err = Boom.badImplementation('userId or password is not found', {
            message: '入力されたユーザー名やパスワードが正しくありません。確認してからやりなおしてください。'
          });
          err.output.payload = Object.assign({}, err.output.payload, err.data);

          return reply(err);
        }

        const account = results[0];
        const jsonWebToken = jwt.sign({
          id: account.id,
          mail: account.mail
        }, secretKey);

        return reply([Object.assign({}, account, { jsonWebToken })]);
      })
      .catch(err => reply(Boom.badImplementation(String(err))));
    }
  },
  {
    path: '/api/login/',
    method: 'GET',
    handler: (request, reply) => {
      const jsonWebToken = request.headers.authorization.split(' ')[1];

      jwt.verify(jsonWebToken, secretKey, (err, decode) => {
        if (err) {
          reply(Boom.badImplementation(String(err)));
        }

        users.getById(decode.id)
        .then(results => {
          if (!results.length) {
            return reply(Boom.badImplementation('User is not found'));
          }

          return reply(results);
        })
        .catch(error => reply(Boom.badImplementation(String(error))));
      });
    }
  }
];
