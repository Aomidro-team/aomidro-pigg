const moment = require('moment');
const execute = require('./mysqlConnection');
const query = {
  add: (roomId, userId, content) => {
    const current = moment().format('YYYY-MM-DD HH:mm:ss');

    return `
      INSERT INTO
        messages (room_id, user_id, content, created_at)
      VALUES
        ("${roomId}", "${userId}", "${content}", "${current}")`;
  },
  getMesseageByRoomId: (roomId, limit = 50) => `
    SELECT
      messages.id as message_id, users.id, users.name, users.user_id, content
    FROM
      messages
    INNER JOIN
      users
    ON
      messages.user_id = users.id
    WHERE
      messages.room_id = "${roomId}"
    ORDER BY
      messages.created_at DESC
    LIMIT ${limit}`
};

module.exports = {
  add: (roomId, userId, content) => new Promise((resolve, reject) => {
    execute(query.add(roomId, userId, content))
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  }),
  getMesseageByRoomId: (roomId, limit) => new Promise((resolve, reject) => {
    execute(query.getMesseageByRoomId(roomId, limit))
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  })
};
