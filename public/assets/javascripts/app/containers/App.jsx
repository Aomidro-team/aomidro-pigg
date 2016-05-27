import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/layout/Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { dropdownIsVisible: false };
  }

  handleBtnClick(e) {
    e.stopPropagation();
    this.setState({ dropdownIsVisible: !this.state.dropdownIsVisible });
  }

  render() {
    const { children, session } = this.props;

    return (
      <div onClick={() => { this.setState({ dropdownIsVisible: false }); }}>
        <Header
          session={session}
          dropdownIsVisible={this.state.dropdownIsVisible}
          handleBtnClick={::this.handleBtnClick}
        />
      {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

function select({ session }) {
  return { session };
}

export default connect(select)(App);
