import io from 'socket.io-client';

const connectSocket = token => {
  const socket = io.connect('', {
    query: `token=${token}`
  });

  socket
  .on('connect', () => {
    console.log('authenticated');

    setTimeout(() => {
      socket.emit('hoge', { hoge: 'piyo' });
    }, 3000);

    socket.on('hoge', msg => {
      console.log(msg);
    });
  }).on('disconnect', () => {
    console.log('disconnected');
  });
};

fetch('/api/auth', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  // TODO: change to login
  body: JSON.stringify({
    username: 'hoge',
    password: 'hoge'
  })
})
.then(response => response.json())
.then(json => {
  connectSocket(json.token);
});
