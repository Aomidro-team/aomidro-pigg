// import io from 'socket.io-client';

fetch('/api/authenticate', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'hoge',
    password: 'hoge'
  })
})
.then(response => {
  console.log(response);
  // const socket = io('http://localhost:3000');
  //
  // socket.on('connect', () => {
  //   socket.emit('c2s_message', { value: 'hogehoge' });
  // });
  //
  // socket.on('chat message', msg => {
  //   console.log(msg);
  // });
});
