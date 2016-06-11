const Hapi = require('hapi');
const config = require('config');
const vision = require('vision');
const handlebars = require('handlebars');
const inert = require('inert');
const jwt = require('jsonwebtoken');

const server = new Hapi.Server();

const route = require('./controllers/route')(jwt);
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
