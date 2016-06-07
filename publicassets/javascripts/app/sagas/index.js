import { fork } from 'redux-saga/effects';
import {
  handleFetchLoginState,
  handleLogin,
  handleLogout,
  handleSignup
} from './auth';

export default function* rootSaga() {
  yield fork(handleFetchLoginState);
  yield fork(handleLogin);
  yield fork(handleLogout);
  yield fork(handleSignup);
}
