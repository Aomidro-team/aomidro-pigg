import { createReducer } from 'redux-act';
import {
  failFetchingRooms,
  successFetchingRooms,
  enterRoom,
  exitRoom
} from '../actions/room';

const initial = {
  room: {
    list: [],
    current: undefined,
    error: undefined
  }
};
const roomBase = {
  id: undefined,
  roomId: undefined,
  name: undefined,
  userCount: undefined
};

const room = createReducer({
  [failFetchingRooms]: (state, err) => Object.assign({}, state, {
    list: [],
    error: err
  }),
  [successFetchingRooms]: (state, payload) => Object.assign({}, state, {
    list: payload.map(obj => Object.assign({}, roomBase, {
      id: obj.id,
      roomId: obj.room_id,
      name: obj.name,
      userCount: obj.count
    })),
    error: undefined
  }),
  [enterRoom]: (state, payload) => Object.assign({}, state, {
    current: payload.currentRoom
  }),
  [exitRoom]: state => Object.assign({}, state, {
    current: undefined
  })
}, initial.room);

export default room;
