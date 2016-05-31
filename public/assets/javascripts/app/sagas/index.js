import { fork } from 'redux-saga/effects';
import { handleLogin, handleSignup } from './session';

export default function* rootSaga() {
  yield fork(handleLogin);
  yield fork(handleSignup);
}
