import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  renderUserId() {
    const { auth, handleBtnClick } = this.props;

    if (auth.isLoggedIn) {
      return <p className="header__info__user" onClick={handleBtnClick}>{auth.user.userId}</p>;
    }

    // TODO: chnge 'sign up' or 'login'
    return <Link className="header__info__signup" to="/signup">Sign Up</Link>;
  }

  render() {
    const { dropdownIsVisible, handleLogout } = this.props;

    return (
      <header className="header u-cf">
        <p className="header__logo u-fl">
          <Link to="/">AomidroPigg</Link>
        </p>

        <div className="header__info u-fr">
          {this.renderUserId()}

          <div className={dropdownIsVisible ? 'header__info__dropdown is-active' : 'header__info__dropdown'}>
            <ul className="header__info__dropdown__list">
              <li><Link className="header__info__dropdown__link" to="/profile">Profile</Link></li>
              <li><span className="header__info__dropdown__link" onClick={handleLogout}>Logout</span></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  dropdownIsVisible: PropTypes.bool.isRequired,
  handleBtnClick: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Header;
