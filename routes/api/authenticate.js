const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  // TODO: change to connecting DB
  if (user.username === 'hoge' && user.password === 'hoge') {
    const token = jwt.sign(user, config.get('authenticate').secret, { expiresIn: '2h' });

    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
