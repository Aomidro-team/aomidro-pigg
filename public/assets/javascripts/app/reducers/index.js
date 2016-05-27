import { createReducer } from 'redux-act';
import { login, logout } from '../actions/session';

const initial = {
  session: {
    logined: false,
    user: {
      id: undefined,
      user_id: undefined,
      name: undefined,
      pass: undefined
    }
  }
};

const session = createReducer({
  [login]: (state, payload) => Object.assign({}, state, {
    logined: true,
    user: {
      id: payload.id,
      user_id: payload.user_id,
      name: payload.user_name,
      pass: payload.pass
    }
  }),
  [logout]: () => initial.session
}, initial.session);

export default { session };

// const users = createReducer({
//   [addUser]: (state, payload) => {
//     return { ...state, [payload.username]: true };
//   },
//   [removeUser]: (state, payload) => {
//     const newState = { ...state };
//     delete newState[payload.username];
//     return newState;
//   }
// }, initial.users);

// const messages = createReducer({
//   [newMessage]: (state, payload) => {
//     const { message } = payload;
//     return {
//       ...state,
//       list: [ ...state.list, message.id ],
//       entities: { ...state.entities, [message.id]: message }
//     };
//   }
// }, initial.messages);
