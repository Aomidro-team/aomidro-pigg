import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Logout extends Component {
  render() {
    return <div>Logout page</div>;
  }
}

export default connect()(Logout);
