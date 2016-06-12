const Hapi = require('hapi');
const config = require('config');
const vision = require('vision');
const handlebars = require('handlebars');
const inert = require('inert');
const AuthBearer = require('hapi-auth-bearer-token');
const jwt = require('jsonwebtoken');
const secretKey = require('config').get('secretKey');

const server = new Hapi.Server();

const route = require('./controllers/route');
const socketIOConnection = require('./controllers/socketIO/connection');


// Connect the server
server.connection({
  host: config.get('host'),
  port: normalizePort(process.env.PORT || '3000')
});

// template engine
server.register(vision, err => {
  if (err) {
    return console.dir(err);
  }

  return server.views({
    engines: {
      html: handlebars
    },
    relativeTo: __dirname,
    path: './public'
  });
});

// serving static files and directories
server.register(inert, err => {
  if (err) {
    throw err;
  }
});

// validation
server.register(AuthBearer, err => {
  if (err) {
    throw err;
  }

  server.auth.strategy('simple', 'bearer-access-token', { validateFunc });
});

function validateFunc(token, callback) {
  const accessToken = this.headers.accesstoken;

  jwt.verify(token, secretKey, (error, decode) => {
    if (error) {
      return callback(null, false, { decode });
    }

    if (accessToken === decode.accessToken) {
      return callback(null, true, { decode });
    }

    return callback(null, false, { decode });
  });
}

// routing
server.route(route);

// WebSocket
socketIOConnection(server.listener);

// Start the server
server.start(err => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
