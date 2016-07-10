import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchRooms } from '../actions/room';

import Loading from '../components/Loading';

class Entrance extends Component {
  componentWillMount() {
    this.props.dispatch(fetchRooms());
  }

  renderRooms() {
    const { error, list } = this.props.room;

    if (error) {
      return <p className="p-entrance__error">{error}</p>;
    }

    return (
      <ul className="p-entrance__list">
        {list.map(item => (
          <li key={item.id}>
            <p className="p-entrance__list__title">{item.name}</p>

            <div className="p-entrance__list__body">
              <p className="p-entrance__list__count">{item.userCount} 人</p>
              <Link className="p-entrance__list__link" to={`/room/${item.id}`}>GO!</Link>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { list, error } = this.props.room;

    if (!list.length && !error) {
      const styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      };

      return (
        <div style={styles}>
          <Loading size={60} border={10} />
        </div>
      );
    }

    return (
      <div className="p-entrance__wrapper">
        <div className="p-entrance__box">
          <p className="p-entrance__title">Select Room</p>

          {this.renderRooms()}
        </div>
      </div>
    );
  }
}

Entrance.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired
};

function select({ auth, room }) {
  return { auth, room };
}

export default connect(select)(Entrance);
