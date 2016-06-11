const mysql = require('mysql');
const config = require('config');
const db = config.get('db');

const dbConfig = {
  host: db.host,
  user: db.user,
  password: db.pass,
  database: db.name
};

const connection = mysql.createConnection(dbConfig);
const execute = query => new Promise((resolve, reject) => {
  connection.query(query, (err, results) => {
    if (err) {
      reject(err);
    }

    resolve(results);
  });
});

module.exports = execute;
