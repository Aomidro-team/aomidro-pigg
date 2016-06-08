import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLoginState, clickLogout } from '../actions/auth';

import Header from '../components/layout/Header';
import Loading from '../components/Loading';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { dropdownIsVisible: false };
  }

  componentWillMount() {
    this.props.dispatch(fetchLoginState());
  }

  handleBtnClick(e) {
    e.stopPropagation();
    this.setState({ dropdownIsVisible: !this.state.dropdownIsVisible });
  }

  handleLogout() {
    this.props.dispatch(clickLogout());
  }

  render() {
    const { children, auth, location } = this.props;

    if (!auth.isPrepared) {
      const styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      };

      return (
        <div style={styles}>
          <Loading size={60} border={10} />
        </div>
      );
    }

    return (
      <div className="container" onClick={() => { this.setState({ dropdownIsVisible: false }); }}>
        <Header
          auth={auth}
          pathname={location.pathname}
          dropdownIsVisible={this.state.dropdownIsVisible}
          handleBtnClick={::this.handleBtnClick}
          handleLogout={::this.handleLogout}
        />
        {children}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function select({ auth }) {
  return { auth };
}

export default connect(select)(App);
