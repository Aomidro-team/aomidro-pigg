import { createReducer } from 'redux-act';
import {
  changeInitPos,
  changeUsers,
  updateCurrentPos,
  changePos
} from '../actions/canvas';
import { exitRoom } from '../actions/room';

const initial = {
  canvas: {
    users: [],
    initPos: {
      x: 0,
      y: 0
    }
  }
};

const canvas = createReducer({
  [exitRoom]: () => initial.canvas,
  [changeInitPos]: (state, payload) => Object.assign({}, state, {
    initPos: {
      x: payload.x,
      y: payload.y
    }
  }),
  [changeUsers]: (state, payload) => Object.assign({}, state, {
    users: payload.body.map(user => Object.assign({}, user, {
      current: user.current || state.initPos,
      goal: user.goal || state.initPos
    }))
  }),
  [updateCurrentPos]: (state, payload) => {
    const newArr = Object.assign({}, state, {
      users: getUpdatedCurrentPos(payload)
    });

    return newArr;
  },
  [changePos]: (state, payload) => Object.assign({}, state, {
    users: state.users.map(user => {
      if (user.id === payload.id) {
        return Object.assign({}, user, {
          goal: payload.goal
        });
      }

      return user;
    })
  })
}, initial.canvas);

const getUpdatedCurrentPos = users => users.map(user => {
  const x = user.goal.x - user.current.x;
  const y = user.goal.y - user.current.y;
  const radian = Math.atan2(y, x);

  let newUser = undefined;
  let xunit = Math.cos(radian) * 5; // 5 = speed
  let yunit = Math.sin(radian) * 5;

  xunit = (x >= -5 && x <= 5) ? 0 : xunit;
  yunit = (y >= -5 && y <= 5) ? 0 : yunit;

  newUser = Object.assign({}, user, {
    current: {
      x: user.current.x + xunit,
      y: user.current.y + yunit
    }
  });

  return newUser;
});

export default canvas;
