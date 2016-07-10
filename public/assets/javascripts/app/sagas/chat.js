import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import {
  enterChat,
  receiveError
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

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('error', () => {
      emit(receiveError());
    });
    // socket.on('users.login', ({ username }) => {
    //   emit(addUser({ username }));
    // });
    // socket.on('users.logout', ({ username }) => {
    //   emit(removeUser({ username }));
    // });
    // socket.on('messages.new', ({ message }) => {
    //   emit(newMessage({ message }));
    // });
    // socket.on('disconnect', e => {
    //   // TODO: handle
    // });

    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  // while (true) {
  //   const { payload } = yield take(`${sendMessage}`);
  //   socket.emit('message', payload);
  // }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

export default function* chatFlow() {
  while (true) {
    const action = yield take(`${enterChat}`);
    const payload = action.payload;
    const socket = yield call(connect, payload);

    socket.emit('enterChat', {
      roomId: payload.roomId,
      userId: payload.userId
    });

    const task = yield fork(handleIO, socket);

    // let action = yield take(`${logout}`);
    // yield cancel(task);
    // socket.emit('logout');
  }
}
