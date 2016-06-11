import uuid from 'node-uuid';
import { take, call, put } from 'redux-saga/effects';
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
import superFetch from '../utils/superFetch';

export function* handleFetchLoginState() {
  while (true) {
    yield take(`${fetchLoginState}`);

    const jwt = localStorage.getItem('jwt');
    const accessToken = localStorage.getItem('accessToken');

    if (jwt) {
      const { payload, err } = yield call(superFetch, {
        url: '/api/login/',
        type: 'GET',
        custom: {
          headers: {
            Authorization: `Bearer ${jwt}`,
            accessToken
          }
        }
      });

      if (payload && !err) {
        yield put(login(Object.assign({}, payload[0], { jwt })));
        continue;
      }
    }

    yield put(failFetchingLoginState());
  }
}

export function* handleLogin() {
  while (true) {
    const action = yield take(`${fetchUser}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/login/',
      type: 'POST',
      data: action.payload,
      custom: {
        headers: {
          accessToken: uuid.v4()
        }
      }
    });

    if (!payload && err) {
      yield put(failFetchingUser(String(err).split('Error: ')[1]));
      continue;
    }

    const jwt = payload[0].jsonWebToken;
    const accessToken = payload[0].accessToken;

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
