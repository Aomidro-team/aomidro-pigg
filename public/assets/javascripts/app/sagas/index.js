import { fork } from 'redux-saga/effects';
import authFlow from './auth';
import roomFlow from './room';
import socketFlow from './socket/';

export default function* rootSaga() {
  yield fork(authFlow);
  yield fork(roomFlow);
  yield fork(socketFlow);
}
