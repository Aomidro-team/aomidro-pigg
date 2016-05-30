import { fork, take, call, put, cancel } from 'redux-saga/effects';
import { fetchUser } from '../actions/session';

const apiUrl = '/api/users/';

const users = user => fetch(apiUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)
})
.then(res => res.json())
.then(payload => ({ payload }))
.catch(err => ({ err }));

function* handleLogin() {
  while (true) {
    const action = yield take(`${fetchUser}`);
    const { payload, error } = yield call(users, action.payload);

    if (payload && !error) {
      console.log(payload);
      // yield put(successUser(payload));
    } else {
      console.log(error);
      // yield put(failureUser(error));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleLogin);
}
