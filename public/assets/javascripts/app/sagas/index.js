import { fork } from 'redux-saga/effects';
import {
  handleFetchLoginState,
  handleLogin,
  handleLogout
} from './auth';

export default function* rootSaga() {
  yield fork(handleFetchLoginState);
  yield fork(handleLogin);
  yield fork(handleLogout);

  // yield fork(handleSessionLogin);
  // yield fork(handleLogin);
  // yield fork(handleClickLogout);
  // yield fork(handleSignup);
}
