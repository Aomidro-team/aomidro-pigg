const express = require('express');
const router = express.Router();
const moment = require('moment');
const getHash = require('../../app/getHash');
const connection = require('../../app/mysqlConnection');

router.get('/', (req, res) => {
  res.render('auth/register', { title: 'ユーザー登録 | アオミドロピグ' });
});

router.post('/', (req, res) => {
  const user = req.body;
  const pass = getHash(user.password);
  const current = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = `INSERT INTO users (user_id, name, password, mail, created_at, updated_at) VALUES ("${user.userId}", "${user.name}", "${pass}", "${user.mail}", "${current}", "${current}")`;

  connection.query(query, () => {
    res.redirect('/login');
  });
});

module.exports = router;
