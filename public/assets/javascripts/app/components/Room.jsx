import React, { PropTypes } from 'react';
import Chat from '../containers/Chat';

const Room = ({ params }) =>
  <div className="wrapper">
    <div className="main">
      <div className="p-canvas">
        <canvas className="js-canvas"></canvas>
      </div>
    </div>

    <Chat roomId={params.roomId} />
  </div>;

Room.propTypes = {
  params: PropTypes.object.isRequired
};

export default Room;
