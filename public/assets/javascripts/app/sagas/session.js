import { take, call, put } from 'redux-saga/effects';
import {
  setUser,
  failureSetUser,
  fetchUserBySession,
  fetchUser,
  failureFetchUser,
  login,
  clickLogout,
  logout,
  signup,
  failureSignup
} from '../actions/session';
import superFetch from '../modules/superFetch';
import operateCookie from '../modules/operateCookie';

export function* handleSetUser() {
  while (true) {
    const action = yield take(`${setUser}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/session/',
      type: 'GET',
      data: action.payload
    });

    if (payload && !err) {
      yield put(fetchUserBySession({
        id: payload[0],
        sid: action.payload
      }));
    } else {
      operateCookie.remove('sid');
      yield put(failureSetUser());
    }
  }
}

export function* handleSessionLogin() {
  while (true) {
    const action = yield take(`${fetchUserBySession}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/session/',
      type: 'POST',
      data: action.payload
    });

    if (payload && !err) {
      yield put(login(payload[0]));
    } else {
      operateCookie.remove('sid');
      yield put(failureSetUser());
    }
  }
}

export function* handleLogin() {
  while (true) {
    const action = yield take(`${fetchUser}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/login/',
      type: 'POST',
      data: action.payload
    });

    if (payload && !err) {
      operateCookie.set({ sid: payload[0].sid });
      yield put(login(payload[0]));
    } else {
      yield put(failureFetchUser(String(err).split('Error: ')[1]));
    }
  }
}

export function* handleClickLogout() {
  while (true) {
    const action = yield take(`${clickLogout}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/session/',
      type: 'DELETE',
      data: action.payload.id
    });

    if (payload || err) {
      operateCookie.remove('sid');
      yield put(logout());
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

    console.log(payload);
    if (payload && !err) {
      location.href = '/login';
    } else {
      yield put(failureSignup(String(err).split('Error: ')[1]));
    }
  }
}
