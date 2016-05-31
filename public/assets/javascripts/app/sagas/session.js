import { take, call, put } from 'redux-saga/effects';
import { fetchUser, failureFetchUser, login, signup, failureSignup } from '../actions/session';

const handleErrors = res => {
  const json = res.json();

  if (!res.ok) {
    return json.then(err => {
      throw Error(err.message);
    });
  }

  return json;
};

const loginUser = user => fetch('/api/login/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)
})
.then(handleErrors)
.then(payload => ({ payload }))
.catch(err => ({ err }));

export function* handleLogin() {
  while (true) {
    const action = yield take(`${fetchUser}`);
    const { payload, err } = yield call(loginUser, action.payload);

    if (payload && !err) {
      yield put(login(payload[0]));
    } else {
      yield put(failureFetchUser(String(err).split('Error: ')[1]));
    }
  }
}

const registerUser = user => fetch('/api/users/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)
})
.then(handleErrors)
.then(payload => ({ payload }))
.catch(err => ({ err }));

export function* handleSignup() {
  while (true) {
    const action = yield take(`${signup}`);
    const { payload, err } = yield call(registerUser, action.payload);

    if (payload && !err) {
      yield put(login(action.payload));
    } else {
      yield put(failureSignup(String(err).split('Error: ')[1]));
    }
  }
}
