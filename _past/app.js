const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ECT = require('ect');
const config = require('config');

const routes = require('./routes/index');
const auth = require('./routes/api/auth');
const register = require('./routes/auth/register');
const login = require('./routes/auth/login');
const logout = require('./routes/auth/logout');

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const getLocalStrategy = require('./app/getLocalStrategy');
const connection = require('./app/mysqlConnection');

const app = express();

// view engine setup
app.engine('html', ECT({ watch: true, root: `${__dirname}/views`, ext: '.html' }).render);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: config.get('auth').secret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(getLocalStrategy());

passport.serializeUser((account, done) => {
  done(null, {
    id: account.id,
    userId: account.user_id,
    name: account.name,
    mail: account.mail,
    password: account.password
  });
});

passport.deserializeUser((serializedAccount, done) => {
  const query = `SELECT * FROM users WHERE id = "${serializedAccount}"`;

  connection.query(query, (err, account) => {
    done(err, {
      id: account.id,
      userId: account.user_id,
      name: account.name,
      mail: account.mail,
      password: account.password
    });
  });
});

app.use('/', routes);
app.use('/api/auth', auth);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
