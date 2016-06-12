const Boom = require('boom');
const rooms = require('../../models/rooms');

module.exports = [
  {
    path: '/api/rooms/',
    method: 'GET',
    handler: (request, reply) => {
      rooms.getWithEnteringUserNum()
      .then(results => {
        if (!results.length) {
          const err = Boom.badImplementation('No room is exist', {
            message: '現在入室できる部屋が存在しません'
          });
          err.output.payload = Object.assign({}, err.output.payload, err.data);

          return reply(err);
        }

        return reply(results);
      })
      .catch(err => reply(Boom.badImplementation(String(err))));
    }
  }
];
