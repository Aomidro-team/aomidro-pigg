import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  renderUserId() {
    const { session, handleBtnClick } = this.props;

    if (session.logined) {
      return <p className="header__info__user" onClick={handleBtnClick}>{session.user.user_id}</p>;
    }

    return false;
  }

  render() {
    return (
      <header className="header u-cf">
        <p className="header__logo u-fl">
          <Link to="/">AomidroPigg</Link>
        </p>

        <div className="header__info u-fr">
          {this.renderUserId()}

          <div className={this.props.dropdownIsVisible ? 'header__info__dropdown is-active' : 'header__info__dropdown'}>
            <ul className="header__info__dropdown__list">
              <li><Link className="header__info__dropdown__link" to="/profile">Profile</Link></li>
              <li><Link className="header__info__dropdown__link" to="/logout">Logout</Link></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  session: PropTypes.object.isRequired,
  dropdownIsVisible: PropTypes.bool.isRequired,
  handleBtnClick: PropTypes.func.isRequired
};

export default Header;
