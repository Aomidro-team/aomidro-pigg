const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.passport) {
    return res.redirect('/login');
  }

  return res.render('index', {
    title: 'アオミドロピグ',
    userId: req.session.passport.user.id,
    userName: req.session.passport.user.userId,
    userPassword: req.session.passport.user.password
  });
});

module.exports = router;
