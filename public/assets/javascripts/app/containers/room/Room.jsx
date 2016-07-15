import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { enterRoom, exitRoom } from '../../actions/room';

import Chat from './Chat';
import Canvas from './Canvas';

class Room extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, auth, room, params } = this.props;
    const { jwt, user } = auth;

    if (!room.list.length) {
      this.context.router.replace('/');
      return;
    }

    dispatch(enterRoom({
      user,
      currentRoom: room.list.filter(item => item.roomId === params.roomId)[0],
      jwt
    }));
  }

  componentWillUnmount() {
    const { dispatch, auth, room } = this.props;

    if (!room.list.length) {
      return;
    }

    dispatch(exitRoom({
      userId: auth.user.userId,
      roomId: room.current.roomId
    }));
  }

  render() {
    const currentRoom = this.props.room.current;

    return (
      <div className="p-room">
        <div className="p-room__main">
          <div className="p-canvas">
            <Canvas currentRoom={currentRoom} />
          </div>
        </div>

        <Chat currentRoom={currentRoom} />
      </div>
    );
  }
}

Room.propTypes = {
  room: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

function select({ room, auth }) {
  return { room, auth };
}

export default connect(select)(Room);
