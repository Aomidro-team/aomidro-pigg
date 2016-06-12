const login = require('./api/login');
const users = require('./api/users');
const rooms = require('./api/rooms');

module.exports = [
  {
    path: '/assets/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: 'public/assets'
      }
    }
  },
  {
    path: '/{param*}',
    method: 'GET',
    handler: (request, reply) => {
      reply.view('index', { title: 'アオミドロピグ' });
    }
  },
  ...login,
  ...users,
  ...rooms
];
