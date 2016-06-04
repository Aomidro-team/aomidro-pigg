import { take, call, put } from 'redux-saga/effects';
import { fetchUser, failureFetchUser, login, signup, failureSignup } from '../actions/session';
import superFetch from '../modules/superFetch';

export function* handleLogin() {
  while (true) {
    const action = yield take(`${fetchUser}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/login/',
      type: 'POST',
      data: action.payload
    });

    if (payload && !err) {
      yield put(login(payload[0]));
    } else {
      yield put(failureFetchUser(String(err).split('Error: ')[1]));
    }
  }
}

export function* handleSignup() {
  while (true) {
    const action = yield take(`${signup}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/users/',
      type: 'POST',
      data: action.payload
    });

    if (payload && !err) {
      yield put(login(action.payload));
    } else {
      yield put(failureSignup(String(err).split('Error: ')[1]));
    }
  }
}
