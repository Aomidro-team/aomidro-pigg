import { createReducer } from 'redux-act';
import {
  failFetchingLoginState,
  fetchUser,
  failFetchingUser,
  login,
  logout
} from '../actions/auth';

const initial = {
  auth: {
    isPrepared: false,
    isLoggedIn: false,
    user: {
      id: undefined,
      userId: undefined,
      name: undefined,
      pass: undefined,
    },
    isFetching: false,
    error: undefined,
    jwt: '',
    accessToken: ''
  }
};

const auth = createReducer({
  [failFetchingLoginState]: state => Object.assign({}, state, {
    isPrepared: true
  }),
  [fetchUser]: state => Object.assign({}, state, {
    isFetching: true,
    error: undefined
  }),
  [failFetchingUser]: (state, err) => Object.assign({}, state, {
    isFetching: false,
    error: err
  }),
  [login]: (state, payload) => Object.assign({}, state, {
    isPrepared: true,
    isLoggedIn: true,
    user: {
      id: payload.id,
      userId: payload.user_id,
      name: payload.name,
      pass: payload.password,
    },
    isFetching: false,
    error: undefined,
    jwt: payload.jwt,
    accessToken: payload.accessToken
  }),
  [logout]: () => Object.assign({}, initial.auth, {
    isPrepared: true
  })
}, initial.auth);

// const session = createReducer({
//   [logout]: () => initial.session,
//   [signup]: state => Object.assign({}, state, { isFetching: true }),
//   [failureSignup]: (state, err) => Object.assign({}, state, {
//     isFetching: false,
//     error: err
//   }),
//   [failureSetUser]: state => Object.assign({}, state, {
//     init: false
//   })
// }, Object.assign({}, initial.session, {
//   init: !!operateCookie.get('sid')
// }));

export default auth;
