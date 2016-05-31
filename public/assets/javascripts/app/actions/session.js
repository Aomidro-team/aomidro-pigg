import { createAction } from 'redux-act';

export const fetchUser = createAction('fetch user');
export const failureFetchUser = createAction('failure fetch user');
export const login = createAction('login');
export const logout = createAction('logout');
export const signup = createAction('signup');
export const failureSignup = createAction('failure signup');
