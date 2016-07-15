import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import {
  receiveError,
  newMessage,
  sendMessage,
  sendIsInputing,
  changeIsInputing
} from '../../actions/chat';

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('error', () => {
      emit(receiveError());
    });
    socket.on('recentlyMessage', messages => {
      emit(newMessage({ body: messages }));
    });
    socket.on('messages.new', body => {
      emit(newMessage({ body: [body] }));
    });
    socket.on('changeIsInputing', body => {
      emit(changeIsInputing(body));
    });

    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(`${sendMessage}`);
    socket.emit('message', payload);
  }
}

function* handleSendIsInputing(socket) {
  while (true) {
    const { payload } = yield take(`${sendIsInputing}`);
    socket.emit('changeIsInputing', payload);
  }
}

export default function* chatHandleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
  yield fork(handleSendIsInputing, socket);
}
