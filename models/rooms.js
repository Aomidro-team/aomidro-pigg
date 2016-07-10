const execute = require('./mysqlConnection');
const query = {
  getWithEnteringUserNum: `
    SELECT
      rooms.id, name, COUNT(users.id) as count
    FROM
      rooms
    LEFT JOIN
      users_rooms as users
    ON
      rooms.id = users.room_id
    WHERE
      rooms.deleted_at IS NULL
    GROUP BY
      rooms.id`
};

module.exports = {
  getWithEnteringUserNum: () => new Promise((resolve, reject) => {
    execute(query.getWithEnteringUserNum)
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  })
};
