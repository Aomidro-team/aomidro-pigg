import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import operateCookie from '../modules/operateCookie';

import Header from '../components/layout/Header';
import Loading from '../components/Loading';
import { clickLogout, setUser } from '../actions/session';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { dropdownIsVisible: false };
  }

  componentWillMount() {
    if (this.props.session.init) {
      this.props.dispatch(setUser(operateCookie.get('sid')));
    }
  }

  handleBtnClick(e) {
    e.stopPropagation();
    this.setState({ dropdownIsVisible: !this.state.dropdownIsVisible });
  }

  handleLogout() {
    this.props.dispatch(clickLogout({ id: this.props.session.user.id }));
  }

  render() {
    const { children, session } = this.props;

    if (session.init) {
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
          session={session}
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
  session: PropTypes.object.isRequired
};

function select({ session }) {
  return { session };
}

export default connect(select)(App);
