import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  renderInfo() {
    const { auth, pathname, handleBtnClick } = this.props;
    let el = undefined;

    if (auth.isLoggedIn) {
      el = <p className="header__info__user" onClick={handleBtnClick}>{auth.user.userId}</p>;
    }

    if (pathname === '/login') {
      el = <Link className="header__info__btn" to="/signup">Sign Up</Link>;
    } else if (pathname === '/signup') {
      el = <Link className="header__info__btn" to="/login">Login</Link>;
    }

    return el;
  }

  render() {
    const { dropdownIsVisible, handleLogout } = this.props;

    return (
      <header className="header u-cf">
        <p className="header__logo u-fl">
          <Link to="/">AomidroPigg</Link>
        </p>

        <div className="header__info u-fr">
          {this.renderInfo()}

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
  pathname: PropTypes.string.isRequired,
  dropdownIsVisible: PropTypes.bool.isRequired,
  handleBtnClick: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Header;
