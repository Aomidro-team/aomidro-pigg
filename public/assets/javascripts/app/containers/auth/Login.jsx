import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/auth';
import Loading from '../../components/Loading';

class Login extends Component {
  handleSubmit(e) {
    const target = e.target;

    e.preventDefault();

    this.props.dispatch(fetchUser({
      userId: target.userId.value.trim(),
      pass: target.password.value.trim()
    }));
  }

  renderSubmit() {
    if (this.props.auth.isFetching) {
      const styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px'
      };

      return (
        <div style={styles}>
          <Loading />
        </div>
      );
    }

    return <input className="p-auth__submit u-hover" type="submit" value="Send" />;
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="p-auth__wrapper">
        <div className="p-auth__inner">
          <h1 className="p-auth__title">Log in</h1>

          <form className="p-auth__form" onSubmit={::this.handleSubmit}>
            <ul className="p-auth__form__list">
              <li>
                <p className="p-auth__form__title">User ID</p>
                <p><input className="p-auth__input" type="text" name="userId" required /></p>
              </li>
              <li>
                <p className="p-auth__form__title">Password</p>
                <p><input className="p-auth__input" type="password" name="password" required /></p>
              </li>
            </ul>

            {auth.error &&
              <p className="p-auth__error">{auth.error}</p>
            }

            {this.renderSubmit()}
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

function select({ auth }) {
  return { auth };
}

export default connect(select)(Login);
