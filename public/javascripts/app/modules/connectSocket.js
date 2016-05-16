import io from 'socket.io-client';
import Chat from './Chat';
import Canvas from './Canvas';

const connectSocket = (token, userName) => {
  const socket = io.connect('', {
    query: `token=${token}`
  });
  const chat = new Chat(socket, userName);
  const canvas = new Canvas(socket, userName);

  chat.events();
  canvas.init();
};

export default connectSocket;
