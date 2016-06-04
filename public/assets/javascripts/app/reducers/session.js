import { createReducer } from 'redux-act';
import {
  fetchUser,
  failureFetchUser,
  login,
  logout,
  signup,
  failureSignup,
  failureSetUser
} from '../actions/session';
import operateCookie from '../modules/operateCookie';

const initial = {
  session: {
    init: false,
    logined: false,
    user: {
      id: undefined,
      userId: undefined,
      name: undefined,
      pass: undefined
    },
    isFetching: false,
    error: undefined
  }
};

const session = createReducer({
  [fetchUser]: state => Object.assign({}, state, {
    isFetching: true,
    error: undefined
  }),
  [failureFetchUser]: (state, err) => Object.assign({}, state, {
    isFetching: false,
    error: err
  }),
  [login]: (state, payload) => Object.assign({}, state, {
    init: false,
    logined: true,
    user: {
      id: payload.id,
      userId: payload.user_id,
      name: payload.name,
      pass: payload.password
    },
    isFetching: false,
    error: undefined
  }),
  [logout]: () => initial.session,
  [signup]: state => Object.assign({}, state, { isFetching: true }),
  [failureSignup]: (state, err) => Object.assign({}, state, {
    isFetching: false,
    error: err
  }),
  [failureSetUser]: state => Object.assign({}, state, {
    init: false
  })
}, Object.assign({}, initial.session, {
  init: !!operateCookie.get('sid')
}));

export default session;
