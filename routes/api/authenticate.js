const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  // TODO: change to connecting DB
  if (user.username === 'hoge' && user.password === 'hoge') {
    const secret = 'fuga';
    const token = jwt.sign(user, secret, { expiresIn: '2h' });

    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
