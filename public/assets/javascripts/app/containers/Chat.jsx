import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { enterChat } from '../actions/chat';

class ChatView extends Component {
  // constructor(props) {
    // super(props);

    // this.hundleSubmit = this.hundleSubmit.bind(this);
    // this.hundleKeyUp = this.hundleKeyUp.bind(this);
    // this.hundleBlur = this.hundleBlur.bind(this);

    // this.scrollFlag = false;
    // this.state = {
    //   chatList: props.store.getChatList(),
    //   isInputing: []
    // };

    // props.socket.on('connect', props.action.connectChat.bind(props.action));
    // props.socket.on('sendRecentlyMsg', props.action.sendRecentlyMsg.bind(props.action));
    // props.socket.on('message', props.action.receiveMessage.bind(props.action));
    // props.socket.on('changeIsInputing', props.action.receiveIsInputing.bind(props.action));

    // props.store.on('addChatList', this.onAddChatList.bind(this));
    // props.store.on('changeInputingUsers', this.onChangeInputingUsers.bind(this));
    // window.addEventListener('beforeunload', props.action.disconnectChat.bind(props.action));
  // }

  componentWillMount() {
    const { dispatch, auth } = this.props;
    const { accessToken } = auth;
    dispatch(enterChat({ accessToken }));
  }

  // componentWillUpdate() {
    // const scroll = document.querySelector('.js-chat-scroll');
    // const list = scroll.querySelector('.js-chat-scroll-list');

    // this.scrollFlag = scroll.scrollTop + scroll.clientHeight === list.clientHeight + 20;
  // }

  // componentDidUpdate() {
    // if (this.scrollFlag) {
    //   const scroll = document.querySelector('.js-chat-scroll');

    //   scroll.scrollTop = scroll.clientHeight;
    // }
  // }

  // onAddChatList() {
  //   this.setState({ chatList: this.props.store.getChatList() });
  // }

  // onChangeInputingUsers() {
  //   this.setState({ isInputing: this.props.store.getInputingUsers() });
  // }

  hundleSubmit(e) {
    e.preventDefault();

    const target = e.target;
    const comment = target.comment.value.trim();

    // this.props.action.sendIsInputing(false);
    // this.props.action.sendMessage(comment);
    target.comment.value = '';
  }

  hundleKeyUp(e) {
    // this.props.action.sendIsInputing(e.target.value !== '');
  }

  hundleBlur() {
    // this.props.action.sendIsInputing(false);
  }

  // renderList() {
  //   return this.state.chatList.map(chat => <li key={chat.msgId}>{chat.msg}</li>);
  // }

  // renderIsInputing() {
  //   const userNum = this.state.isInputing.length;

  //   if (userNum === 0) {
  //     return false;
  //   } else if (userNum === 1) {
  //     return <li className="p-chat__list__inputing">{this.state.isInputing[0]} is typing...</li>;
  //   } else if (userNum <= 3) {
  //     return <li className="p-chat__list__inputing">{this.state.isInputing.join(', ')} are typing...</li>;
  //   } else if (userNum >= 4) {
  //     return <li className="p-chat__list__inputing">Several people are typing...</li>;
  //   }

  //   return false;
  // }

  render() {
    return (
      <div className="p-chat">
        <div className="p-chat__inner">
          <div className="p-chat__box">
            <ul className="p-chat__list"></ul>
          </div>
        </div>

        <form className="p-chat__comment" onSubmit={::this.hundleSubmit}>
          <div className="p-chat__comment__txt">
            <input className="p-chat__comment__txt__input" name="comment" type="text" placeholder="チャットを送る…" autoComplete="off" onKeyUp={this.hundleKeyUp} onBlur={this.hundleBlur} />
          </div>
          <input className="p-chat__comment__btn" type="submit" value="送信" />
        </form>
      </div>
    );
  }
}

// {this.renderList()}
// {this.renderIsInputing()}

ChatView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired
};

function select({ auth, chat }) {
  return { auth, chat };
}

export default connect(select)(ChatView);
