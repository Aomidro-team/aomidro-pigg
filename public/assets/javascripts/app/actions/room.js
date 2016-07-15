import { createAction } from 'redux-act';

export const fetchRooms = createAction('fetch rooms');
export const failFetchingRooms = createAction('fail fetching rooms');
export const successFetchingRooms = createAction('success fetching rooms');
export const setCurrentRoom = createAction('set current room');

export const enterRoom = createAction('enter room');
export const exitRoom = createAction('exit room');
