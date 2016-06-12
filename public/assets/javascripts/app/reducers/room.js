import { createReducer } from 'redux-act';
import {
  failFetchingRooms,
  successFetchingRooms
} from '../actions/room';

const initial = {
  room: {
    isPrepared: false,
    all: [],
    current: undefined,
    currentRoomUsers: [],
    error: undefined
  }
};
const roomBase = {
  id: undefined,
  roomId: undefined,
  name: undefined,
  userCount: undefined
};
const userBase = {
  id: undefined,
  userId: undefined
};

const room = createReducer({
  [failFetchingRooms]: (state, err) => Object.assign({}, state, {
    isPrepared: true,
    all: [],
    error: err
  }),
  [successFetchingRooms]: (state, payload) => Object.assign({}, state, {
    isPrepared: true,
    all: [
      ...state.all,
      ...payload.map(obj => Object.assign({}, roomBase, {
        id: obj.id,
        roomId: obj.room_id,
        name: obj.name,
        userCount: obj.count
      }))
    ],
    error: undefined
  })
}, initial.room);

export default room;
