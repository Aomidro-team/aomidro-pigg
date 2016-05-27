import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Index extends Component {
  render() {
    return <div>Index page</div>;
  }
}

export default connect()(Index);
