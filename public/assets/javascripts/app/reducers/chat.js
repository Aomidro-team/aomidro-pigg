import { createReducer } from 'redux-act';
import {
  receiveError
} from '../actions/chat';

const initial = {
  chat: {
    roomId: undefined,
    list: [],
    inputingUsers: [],
    users: [],
    err: false
  }
};

const chat = createReducer({
  [receiveError]: state => Object.assign({}, state, {
    err: true
  })
}, initial.chat);

export default chat;
