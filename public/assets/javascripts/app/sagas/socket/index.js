import io from 'socket.io-client';
import { take, call, fork, cancel } from 'redux-saga/effects';
import chatHandleIO from './chat';
import canvasHandleIO from './canvas';
import { enterRoom, exitRoom } from '../../actions/room';

function connect({ jwt }) {
  const socket = io.connect('');

  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.on('authenticated', () => {
        resolve(socket);
      })
      .emit('authenticate', { token: jwt });
    });
  });
}

export default function* socketFlow() {
  while (true) {
    const action = yield take(`${enterRoom}`);
    const payload = action.payload;
    const socket = yield call(connect, payload);

    socket.emit('enterRoom', {
      room: {
        id: payload.currentRoom.id,
        roomId: payload.currentRoom.roomId
      },
      user: {
        id: payload.user.id,
        userId: payload.user.userId
      }
    });

    const chatTask = yield fork(chatHandleIO, socket);
    const canvasTask = yield fork(canvasHandleIO, socket);

    yield take(`${exitRoom}`);
    yield cancel(chatTask);
    yield cancel(canvasTask);
    socket.emit('exitRoom');
  }
}
