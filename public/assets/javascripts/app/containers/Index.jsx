import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Chat from './Chat';

class Index extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="p-canvas">
            <canvas className="js-canvas"></canvas>
          </div>
        </div>

        <Chat />
      </div>
    );
  }
}

export default connect()(Index);
