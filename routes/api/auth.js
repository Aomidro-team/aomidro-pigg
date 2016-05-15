const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const connection = require('../../app/mysqlConnection');

router.post('/', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  const query = `SELECT * FROM users WHERE user_id = "${user.username}"`;

  connection.query(query, (err) => {
    if (err) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(user, config.get('auth').secret, { expiresIn: '2h' });

    return res.json({ token });
  });
});

module.exports = router;
