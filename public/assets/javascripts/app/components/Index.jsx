import React from 'react';
import Chat from '../containers/Chat';

const Index = () =>
  <div className="wrapper">
    <div className="main">
      <div className="p-canvas">
        <canvas className="js-canvas"></canvas>
      </div>
    </div>

    <Chat />
  </div>;

export default Index;
