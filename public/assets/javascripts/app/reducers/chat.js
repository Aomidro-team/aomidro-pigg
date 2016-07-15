import { createReducer } from 'redux-act';
import {
  receiveError,
  newMessage,
  changeIsInputing
} from '../actions/chat';
import { exitRoom } from '../actions/room';

const initial = {
  chat: {
    list: [],
    inputingUsers: [],
    users: [],
    err: false
  }
};

const chat = createReducer({
  [receiveError]: state => Object.assign({}, state, {
    err: true
  }),
  [exitRoom]: () => initial.chat,
  [newMessage]: (state, payload) => Object.assign({}, state, {
    list: [
      ...state.list,
      ...payload.body
    ]
  }),
  [changeIsInputing]: (state, payload) => Object.assign({}, state, {
    inputingUsers: payload.isInputing ? Array.from(new Set([
      ...state.inputingUsers,
      payload.user.userId
    ])) : state.inputingUsers.filter(user => user !== payload.user.userId)
  })
}, initial.chat);

export default chat;
