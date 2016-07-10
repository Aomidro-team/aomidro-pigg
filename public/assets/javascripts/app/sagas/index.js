import { fork } from 'redux-saga/effects';
import authFlow from './auth';
import roomFlow from './room';
import chatFlow from './chat';

export default function* rootSaga() {
  yield fork(authFlow);
  yield fork(roomFlow);
  yield fork(chatFlow);
}
