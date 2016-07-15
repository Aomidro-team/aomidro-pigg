import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  sendMessage,
  sendIsInputing
} from '../../actions/chat';
import { clickLogout } from '../../actions/auth';

class ChatView extends Component {
  constructor() {
    super();

    this.flag = {
      scroll: true,
      newMessage: false
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.chat.err) {
      this.props.dispatch(clickLogout());
    }

    const scroll = document.querySelector('.js-chat-scroll');
    this.flag.scroll = scroll.scrollTop === scroll.scrollHeight - scroll.offsetHeight;

    const { chat, auth } = this.props;
    const nextList = nextProps.chat.list;
    const nextListLast = nextList[nextList.length - 1];
    const currentList = chat.list;
    const currentListLast = currentList[currentList.length - 1];

    if (!currentListLast) {
      return;
    }

    if (nextListLast.id !== currentListLast.id && nextListLast.user.id !== auth.user.id) {
      this.flag.newMessage = true;
    }
  }

  componentDidUpdate() {
    if (this.flag.scroll) {
      const scroll = document.querySelector('.js-chat-scroll');
      scroll.scrollTop = scroll.scrollHeight - scroll.offsetHeight;
    }
  }

  hundleSubmit(e) {
    e.preventDefault();

    const target = e.target;
    const comment = target.comment.value.trim();
    const { dispatch, auth, currentRoom } = this.props;
    const { user } = auth;

    dispatch(sendIsInputing({
      isInputing: e.target.value !== '',
      room: currentRoom,
      user
    }));
    dispatch(sendMessage({
      user,
      room: currentRoom,
      content: comment
    }));
    target.comment.value = '';
  }

  hundleKeyUp(e) {
    const { dispatch, auth, currentRoom } = this.props;

    dispatch(sendIsInputing({
      isInputing: e.target.value !== '',
      room: currentRoom,
      user: auth.user
    }));
  }

  hundleBlur() {
    const { dispatch, auth, currentRoom } = this.props;

    dispatch(sendIsInputing({
      isInputing: false,
      room: currentRoom,
      user: auth.user
    }));
  }

  hundleFocus(e) {
    const valueIsExist = e.target.value !== '';
    const { dispatch, auth, currentRoom } = this.props;

    if (valueIsExist) {
      dispatch(sendIsInputing({
        isInputing: true,
        room: currentRoom,
        user: auth.user
      }));
    }
  }

  handleBottomClick(e) {
    e.preventDefault();

    const scroll = document.querySelector('.js-chat-scroll');
    scroll.scrollTop = scroll.scrollHeight - scroll.offsetHeight;
    e.target.classList.remove('is-active');
    this.flag = {
      scroll: true,
      newMessage: false
    };
  }

  renderIsInputing() {
    const inputingUsers = this.props.chat.inputingUsers;
    const userNum = inputingUsers.length;

    if (userNum === 1) {
      return <li className="p-chat__list__inputing">{inputingUsers[0]} is typing...</li>;
    } else if (userNum === 2 || userNum === 3) {
      return <li className="p-chat__list__inputing">{inputingUsers.join(', ')} are typing...</li>;
    } else if (userNum >= 4) {
      return <li className="p-chat__list__inputing">Several people are typing...</li>;
    }

    return false;
  }

  render() {
    const { list } = this.props.chat;

    return (
      <div className="p-chat">
        <div className="p-chat__inner js-chat-scroll">
          <div className="p-chat__box">
            <ul className="p-chat__list">
              {list.map(item => (
                <li key={item.id}>{item.content}</li>
              ))}
              {this.renderIsInputing()}
            </ul>
          </div>
        </div>

        {(!this.flag.scroll && this.flag.newMessage) &&
          <a onClick={::this.handleBottomClick} href="" className="p-chat__new is-active">↓ new message!</a>
        }

        <form className="p-chat__comment" onSubmit={::this.hundleSubmit}>
          <div className="p-chat__comment__txt">
            <input className="p-chat__comment__txt__input" name="comment" type="text" placeholder="チャットを送る…" autoComplete="off" onKeyUp={::this.hundleKeyUp} onBlur={::this.hundleBlur} onFocus={::this.hundleFocus} required />
          </div>
          <input className="p-chat__comment__btn" type="submit" value="送信" />
        </form>
      </div>
    );
  }
}

ChatView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  currentRoom: PropTypes.object
};

function select({ auth, chat }) {
  return { auth, chat };
}

export default connect(select)(ChatView);
