import { createReducer } from 'redux-act';
import { fetchUser, login, logout } from '../actions/session';

const initial = {
  session: {
    logined: false,
    user: {
      id: undefined,
      userId: undefined,
      name: undefined,
      pass: undefined
    },
    isFetching: false,
    error: null
  }
};

const session = createReducer({
  [fetchUser]: (state) => Object.assign({}, state, {
    isFetching: true,
    error: null
  }),
  [login]: (state, payload) => Object.assign({}, state, {
    logined: true,
    user: {
      id: payload.id,
      userId: payload.userId,
      name: payload.user_name,
      pass: payload.pass
    }
  }),
  [logout]: () => initial.session
}, initial.session);

export default session;
