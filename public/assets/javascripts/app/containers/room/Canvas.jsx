import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  changeInitPos,
  updateCurrentPos,
  setSelfGoalPos
} from '../../actions/canvas';

class Canvas extends Component {
  constructor() {
    super();

    this.timerID = undefined;
  }

  componentDidMount() {
    this.canvas = document.getElementsByClassName('js-canvas')[0];
    this.context = this.canvas.getContext('2d');

    this.setSize();
    this.drawScreen();

    window.addEventListener('resize', ::this.setSize, false);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.timerID);
  }

  setSize() {
    this.canvas.width = innerWidth - 300 - 10;
    this.canvas.height = innerHeight - 40 - 10;
    this.props.dispatch(changeInitPos({
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    }));
  }

  setGoalPos(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;
    const { dispatch, auth, currentRoom } = this.props;
    const { user } = auth;

    dispatch(setSelfGoalPos({
      goal: { x, y },
      user,
      room: currentRoom
    }));
  }

  drawScreen() {
    const { dispatch, canvas } = this.props;

    dispatch(updateCurrentPos(canvas.users));

    this.renderBg();
    canvas.users.forEach(user => {
      this.addUserBody(user);
      this.addUserName(user);
    });

    this.timerID = requestAnimationFrame(::this.drawScreen);
  }

  addUserBody(user) {
    this.context.fillStyle = '#000';
    this.context.beginPath();
    this.context.arc(user.current.x, user.current.y, 15, 0, Math.PI * 2, true);
    this.context.fill();
  }

  addUserName(user) {
    this.context.fillStyle = '#222';
    this.context.font = '18px "PT Sans"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'top';
    this.context.fillText(user.userId, user.current.x, user.current.y + 18, 100);
  }

  renderBg() {
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    return <canvas onClick={::this.setGoalPos} className="js-canvas"></canvas>;
  }
}

Canvas.propTypes = {
  dispatch: PropTypes.func.isRequired,
  canvas: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  currentRoom: PropTypes.object
};


function select({ auth, canvas }) {
  return { auth, canvas };
}

export default connect(select)(Canvas);
