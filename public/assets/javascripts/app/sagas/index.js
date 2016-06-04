import { fork } from 'redux-saga/effects';
import { handleSetUser, handleSessionLogin, handleLogin, handleClickLogout, handleSignup } from './session';

export default function* rootSaga() {
  yield fork(handleSetUser);
  yield fork(handleSessionLogin);
  yield fork(handleLogin);
  yield fork(handleClickLogout);
  yield fork(handleSignup);
}
