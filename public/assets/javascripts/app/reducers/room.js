import { createReducer } from 'redux-act';
import {
  failFetchingRooms,
  successFetchingRooms
} from '../actions/room';

const initial = {
  room: {
    list: [],
    error: undefined
  }
};
const roomBase = {
  id: undefined,
  name: undefined,
  userCount: undefined
};

const room = createReducer({
  [failFetchingRooms]: (state, err) => Object.assign({}, state, {
    list: [],
    error: err
  }),
  [successFetchingRooms]: (state, payload) => Object.assign({}, state, {
    list: [
      ...state.list,
      ...payload.map(obj => Object.assign({}, roomBase, {
        id: obj.id,
        name: obj.name,
        userCount: obj.count
      }))
    ],
    error: undefined
  })
}, initial.room);

export default room;
