import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  socket.emit('c2s_message', { value: 'hogehoge' });
});

socket.on('chat message', msg => {
  console.log(msg);
});
