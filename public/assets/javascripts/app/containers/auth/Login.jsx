import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/session';
import Loading from '../../components/loading';

class Login extends Component {
  handleSubmit(e) {
    const target = e.target;

    e.preventDefault();

    this.props.dispatch(fetchUser({
      userId: target.userId.value,
      pass: target.password.value
    }));
  }

  renderSubmit() {
    const styles = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px'
    };

    if (this.props.session.isFetching) {
      return (
        <div style={styles}>
          <Loading />
        </div>
      );
    }

    return <input className="p-auth__submit u-hover" type="submit" value="Send" />;
  }

  render() {
    return (
      <div className="p-auth__wrapper">
        <div className="p-auth__inner">
          <h1 className="p-auth__title">Login</h1>

          <form onSubmit={::this.handleSubmit}>
            <ul className="p-auth__form">
              <li>
                <p className="p-auth__form__title">User ID</p>
                <p><input className="p-auth__input" type="text" name="userId" required /></p>
              </li>
              <li>
                <p className="p-auth__form__title">Password</p>
                <p><input className="p-auth__input" type="password" name="password" required /></p>
              </li>
            </ul>

            <p className="p-auth__error"></p>

            {this.renderSubmit()}
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

function select({ session }) {
  return { session };
}

export default connect(select)(Login);
