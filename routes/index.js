const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.passport) {
    res.redirect('/login');
  }

  res.render('index', {
    title: 'アオミドロピグ',
    userId: req.session.passport.user.userId
  });
});

module.exports = router;
