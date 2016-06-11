const moment = require('moment');
const execute = require('./mysqlConnection');
const encrypt = require('../utils/encrypt');
const query = {
  getById: id => `
    SELECT
      id, user_id, name, mail
    FROM
      users
    WHERE
      id = "${id}"
    AND
      deleted_at IS NULL`,
  getByUserId: userId => `
    SELECT
      *
    FROM
      users
    WHERE
      user_id = "${userId}"`,
  getByMail: mail => `
    SELECT
      *
    FROM
      users
    WHERE
      mail = "${mail}"`,
  getByUserIdAndPass: (userId, pass) => `
    SELECT
      id, user_id, name, mail
    FROM
     users
    WHERE
      user_id = "${userId}"
    AND
      password = "${encrypt(pass)}"
    AND
      deleted_at IS NULL`,
  add: payload => {
    const current = moment().format('YYYY-MM-DD HH:mm:ss');

    return `
      INSERT INTO
        users (user_id, name, password, mail, created_at, updated_at)
      VALUES
        ("${payload.userId}", "${payload.name}", "${encrypt(payload.pass)}", "${payload.mail}", "${current}", "${current}")`;
  }
};

module.exports = {
  getById: id => new Promise((resolve, reject) => {
    execute(query.getById(id))
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  }),
  getByUserId: userId => new Promise((resolve, reject) => {
    execute(query.getByUserId(userId))
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  }),
  getByMail: mail => new Promise((resolve, reject) => {
    execute(query.getByMail(mail))
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  }),
  getByUserIdAndPass: (userId, pass) => new Promise((resolve, reject) => {
    execute(query.getByUserIdAndPass(userId, pass))
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  }),
  add: payload => new Promise((resolve, reject) => {
    execute(query.add(payload))
    .then(results => { resolve(results); })
    .catch(err => { reject(err); });
  })
};
