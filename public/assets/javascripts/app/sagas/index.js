import { fork } from 'redux-saga/effects';
import {
  handleFetchLoginState,
  handleLogin,
  handleLogout,
  handleSignup
} from './auth';
import { handleFetchRooms } from './room';
import chatFlow from './chat';

export default function* rootSaga() {
  yield fork(handleFetchLoginState);
  yield fork(handleLogin);
  yield fork(handleLogout);
  yield fork(handleSignup);

  yield fork(handleFetchRooms);

  yield fork(chatFlow);
}
