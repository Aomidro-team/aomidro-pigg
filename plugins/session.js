exports.register = (server, options, next) => {
  const getState = () => ({});

  server.decorate('request', 'session', getState, {
    apply: true
  });

  return next();
};

exports.register.attributes = {
  name: 'session',
  version: '1.0.0'
};
