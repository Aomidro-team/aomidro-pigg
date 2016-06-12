import { take, call, put } from 'redux-saga/effects';
import {
  fetchRooms,
  failFetchingRooms,
  successFetchingRooms
} from '../actions/room';
import superFetch from '../utils/superFetch';

export function* handleFetchRooms() {
  while (true) {
    yield take(`${fetchRooms}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/rooms/',
      type: 'GET'
    });

    if (!payload && err) {
      yield put(failFetchingRooms(String(err).split('Error: ')[1]));
      continue;
    }

    yield put(successFetchingRooms(payload));
  }
}
