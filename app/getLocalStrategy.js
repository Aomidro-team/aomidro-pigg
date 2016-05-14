const LocalStrategy = require('passport-local').Strategy;
const connection = require('./mysqlConnection');
const getHash = require('./getHash');

module.exports = () => new LocalStrategy(
  {
    usernameField: 'userId',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, userId, password, done) => {
    process.nextTick(() => {
      const query = `SELECT * FROM users WHERE user_id = "${userId}"`;

      connection.query(query, (err, account) => {
        if (err) {
          return done(err);
        }

        if (!account) {
          req.flash('error', 'ユーザーが見つかりませんでした。');
          req.flash('input_id', userId);
          req.flash('input_password', password);

          return done(null, false);
        }

        const hashedPassword = getHash(password);

        if (account[0].password !== hashedPassword && account[0].password !== password) {
          req.flash('error', 'パスワードが間違っています。');
          req.flash('input_id', userId);
          req.flash('input_password', password);

          return done(null, false);
        }

        return done(null, account[0]);
      });
    });
  }
);
