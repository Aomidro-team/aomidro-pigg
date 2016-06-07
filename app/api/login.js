const Boom = require('boom');
const encrypt = require('../encrypt');
const execute = require('../mysqlConnection');

module.exports = jwt => [
  {
    path: '/api/login/',
    method: 'POST',
    handler: (request, reply) => {
      const userId = request.payload.userId;
      const pass = encrypt(request.payload.pass);
      const query = `
        SELECT
          id, user_id, name, mail
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

        const account = results[0];
        const accessToken = request.headers.authorization;
        const jsonWebToken = jwt.sign(Object.assign({}, account, { accessToken }), accessToken);

        return reply([Object.assign({}, account, { jsonWebToken })]);
      })
      .catch(err => reply(Boom.badImplementation(String(err))));
    }
  },
  {
    path: '/api/login/{token*}',
    method: 'GET',
    handler: (request, reply) => {
      const params = JSON.parse(request.params.token.split('/')[0]);
      const jsonWebToken = params.jwt;
      const accessToken = params.accessToken;

      jwt.verify(jsonWebToken, accessToken, (err, decode) => {
        if (err) {
          reply(Boom.badImplementation(String(err)));
        }

        return reply([Object.assign({}, decode, { jsonWebToken })]);
      });
    }
  }
];
