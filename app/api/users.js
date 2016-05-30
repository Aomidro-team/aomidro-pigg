const mysqlConnection = require('../mysqlConnection');
const connection = mysqlConnection.connection;
const exec = mysqlConnection.exec;

// const fetchUserById()

module.exports = [
  {
    path: '/api/users/',
    method: 'POST',
    handler: (request, reply) => {
      const userId = request.payload.userId;
      // const pass = request.payload.pass;
      const query = `SELECT * FROM users WHERE user_id = "${userId}" AND deleted_at IS NULL`;

      exec(query)
      .then(results => reply(results))
      .catch(err => {
        throw err;
      });
    }
  }
];
