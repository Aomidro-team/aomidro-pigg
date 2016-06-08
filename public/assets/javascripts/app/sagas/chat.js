import { take, call, put } from 'redux-saga/effects';
import io from 'socket.io-client';
import {
  enterChat
} from '../actions/chat';

function connect({ accessToken }) {
  const socket = io.connect('', {
    query: `token=${accessToken}`
  });

  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
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
