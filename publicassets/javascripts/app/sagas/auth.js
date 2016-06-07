import { take, call, put } from 'redux-saga/effects';
import uuid from 'node-uuid';
import {
  fetchLoginState,
  failFetchingLoginState,
  fetchUser,
  failFetchingUser,
  login,
  clickLogout,
  logout,
  signup,
  failSignup
} from '../actions/auth';
import superFetch from '../modules/superFetch';

export function* handleFetchLoginState() {
  while (true) {
    yield take(`${fetchLoginState}`);

    const jwt = localStorage.getItem('jwt');
    const accessToken = localStorage.getItem('accessToken');

    if (jwt && accessToken) {
      const { payload, err } = yield call(superFetch, {
        url: '/api/login/',
        type: 'GET',
        data: JSON.stringify({ jwt, accessToken })
      });

      if (payload && !err) {
        yield put(login(Object.assign({}, payload[0], { jwt, accessToken })));
        continue;
      }
    }

    yield put(failFetchingLoginState());
  }
}

export function* handleLogin() {
  while (true) {
    const action = yield take(`${fetchUser}`);
    const accessToken = uuid.v4();
    const { payload, err } = yield call(superFetch, {
      url: '/api/login/',
      type: 'POST',
      data: action.payload,
      custom: {
        headers: { Authorization: accessToken }
      }
    });

    if (!payload && err) {
      yield put(failFetchingUser(String(err).split('Error: ')[1]));
      continue;
    }

    const jwt = payload[0].jsonWebToken;

    localStorage.setItem('jwt', jwt);
    localStorage.setItem('accessToken', accessToken);

    yield put(login(Object.assign({}, payload[0], { jwt, accessToken })));
  }
}

export function* handleLogout() {
  while (true) {
    yield take(`${clickLogout}`);

    localStorage.removeItem('jwt');
    localStorage.removeItem('accessToken');

    yield put(logout());
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
      const { userId, pass } = action.payload;

      yield put(fetchUser({ userId, pass }));
    } else {
      yield put(failSignup(String(err).split('Error: ')[1]));
    }
  }
}
