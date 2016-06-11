import { take, call, put } from 'redux-saga/effects';
import io from 'socket.io-client';
import {
  enterChat
} from '../actions/chat';

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

export default function* chatFlow() {
  while (true) {
    const action = yield take(`${enterChat}`);
    const socket = yield call(connect, action.payload);
    console.log(socket);

    // socket.emit('login', { username: payload.username });
    //
    // const task = yield fork(handleIO, socket);
    //
    // let action = yield take(`${logout}`);
    // yield cancel(task);
    // socket.emit('logout');
  }
}
