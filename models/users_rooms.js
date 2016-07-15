const moment = require('moment');
const execute = require('./mysqlConnection');
const query = {
  add: (userId, roomId) => {
    const current = moment().format('YYYY-MM-DD HH:mm:ss');

    return `
      INSERT INTO
        users_rooms (user_id, room_id, created_at)
      VALUES
        ("${userId}", "${roomId}", "${current}")`;
  },
  deleteByUserId: userId => `
    DELETE FROM
      users_rooms
    WHERE
      user_id = "${userId}"
  `
};

module.exports = {
  add: (userId, roomId) => new Promise((resolve, reject) => {
    execute(query.add(userId, roomId))
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  }),
  deleteByUserId: userId => new Promise((resolve, reject) => {
    execute(query.deleteByUserId(userId))
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  })
};
