const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.passport) {
    res.redirect('/');
  }

  res.render('auth/login', {
    title: 'ログイン | アオミドロピグ',
    error: req.flash('error'),
    input_id: req.flash('input_id'),
    input_password: req.flash('input_password')
  });
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
