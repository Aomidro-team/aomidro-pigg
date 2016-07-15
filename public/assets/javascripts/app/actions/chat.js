import { createAction } from 'redux-act';

export const receiveError = createAction('receive error');
export const newMessage = createAction('new message');
export const sendMessage = createAction('send message');
export const sendIsInputing = createAction('send isInputing');
export const changeIsInputing = createAction('change isInputing');
