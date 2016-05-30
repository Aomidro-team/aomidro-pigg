import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class GuestOnly extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.userWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.userWillTransfer(nextProps, this.context.router);
  }

  userWillTransfer(props, router) {
    if (props.session.logined) {
      router.replace('/');
    }
  }

  render() {
    return <div className="wrapper">{this.props.children}</div>;
  }
}

GuestOnly.propTypes = {
  children: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

function select({ session }) {
  return { session };
}

export default connect(select)(GuestOnly);
