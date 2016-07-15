import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import {
  changeUsers,
  setSelfGoalPos,
  changePos
} from '../../actions/canvas';

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('changeUsers', body => {
      emit(changeUsers({ body }));
    });
    socket.on('newGoalPos', changedUser => {
      emit(changePos(changedUser));
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

function* handleSetGoalPos(socket) {
  while (true) {
    const { payload } = yield take(`${setSelfGoalPos}`);
    socket.emit('updateGoalPos', payload);
  }
}

export default function* canvasHandleIO(socket) {
  yield fork(read, socket);
  yield fork(handleSetGoalPos, socket);
}
