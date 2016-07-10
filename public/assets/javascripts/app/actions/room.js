import { createAction } from 'redux-act';

export const fetchRooms = createAction('fetch rooms');
export const failFetchingRooms = createAction('fail fetching rooms');
export const successFetchingRooms = createAction('success fetching rooms');
export const setCurrentRoom = createAction('set current room');
