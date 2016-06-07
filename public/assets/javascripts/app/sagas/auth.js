import { take, call, put } from 'redux-saga/effects';
import uuid from 'node-uuid';
import {
  fetchLoginState,
  failFetchingLoginState,
  fetchUser,
  failFetchingUser,
  login,
  clickLogout,
  logout
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

// export function* handleSetUser() {
//   while (true) {
//     const action = yield take(`${setUser}`);
//     const { payload, err } = yield call(superFetch, {
//       url: '/api/session/',
//       type: 'GET',
//       data: action.payload
//     });
//
//     if (payload && !err) {
//       yield put(fetchUserBySession({
//         id: payload[0],
//         sid: action.payload
//       }));
//     } else {
//       operateCookie.remove('sid');
//       yield put(failureSetUser());
//     }
//   }
// }
//
// export function* handleSessionLogin() {
//   while (true) {
//     const action = yield take(`${fetchUserBySession}`);
//     const { payload, err } = yield call(superFetch, {
//       url: '/api/session/',
//       type: 'POST',
//       data: action.payload
//     });
//
//     if (payload && !err) {
//       yield put(login(payload[0]));
//     } else {
//       operateCookie.remove('sid');
//       yield put(failureSetUser());
//     }
//   }
// }
//
//
// export function* handleClickLogout() {
//   while (true) {
//     const action = yield take(`${clickLogout}`);
//     const { payload, err } = yield call(superFetch, {
//       url: '/api/session/',
//       type: 'DELETE',
//       data: action.payload.id
//     });
//
//     if (payload || err) {
//       operateCookie.remove('sid');
//       yield put(logout());
//     }
//   }
// }
//
// export function* handleSignup() {
//   while (true) {
//     const action = yield take(`${signup}`);
//     const { payload, err } = yield call(superFetch, {
//       url: '/api/users/',
//       type: 'POST',
//       data: action.payload
//     });
//
//     console.log(payload);
//     if (payload && !err) {
//       location.href = '/login';
//     } else {
//       yield put(failureSignup(String(err).split('Error: ')[1]));
//     }
//   }
// }
