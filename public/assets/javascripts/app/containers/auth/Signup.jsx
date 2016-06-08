import React from 'react';
import { connect } from 'react-redux';

import AuthBase from './AuthBase';
import { signup } from '../../actions/auth';

class Signup extends AuthBase {
  handleSubmit(e) {
    const target = e.target;

    e.preventDefault();

    this.props.dispatch(signup({
      userId: target.userId.value.trim(),
      name: target.name.value.trim(),
      mail: target.mail.value.trim(),
      pass: target.password.value.trim()
    }));
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="p-auth__wrapper">
        <div className="p-auth__inner">
          <h1 className="p-auth__title">Sign up</h1>

          <form className="p-auth__form" onSubmit={::this.handleSubmit}>
            <ul className="p-auth__form__list">
              <li>
                <p className="p-auth__form__title">User ID</p>
                <p><input className="p-auth__input" type="text" name="userId" required /></p>
              </li>
              <li>
                <p className="p-auth__form__title">Name</p>
                <p><input className="p-auth__input" type="text" name="name" required /></p>
              </li>
              <li>
                <p className="p-auth__form__title">Mail</p>
                <p><input className="p-auth__input" type="email" name="mail" required /></p>
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

function select({ auth }) {
  return { auth };
}

export default connect(select)(Signup);
