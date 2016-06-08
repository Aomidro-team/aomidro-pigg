import { createReducer } from 'redux-act';
import {
  enterChat
} from '../actions/chat';

const initial = {
  chat: {
    list: [],
    inputingUsers: []
  }
};

const chat = createReducer({

}, initial.chat);

export default chat;
