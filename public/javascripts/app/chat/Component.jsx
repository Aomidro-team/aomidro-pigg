import React, { Component, PropTypes } from 'react';

export default class ChatView extends Component {
  constructor(props) {
    super(props);

    this.hundleSubmit = this.hundleSubmit.bind(this);
    this.scrollFlag = false;
    this.state = { chatList: props.store.getChatList() };

    props.socket.on('message', props.action.receiveMessage.bind(props.action));
    props.socket.on('connect', props.action.connectChat.bind(props.action));

    props.store.on('addChatList', this.onAddChatList.bind(this));
    window.addEventListener('beforeunload', props.action.disconnectChat.bind(props.action));
  }

  componentWillUpdate() {
    const scroll = document.querySelector('.js-chat-scroll');
    const list = scroll.querySelector('.js-chat-scroll-list');

    this.scrollFlag = scroll.scrollTop + scroll.clientHeight === list.clientHeight + 20;
  }

  componentDidUpdate() {
    if (this.scrollFlag) {
      const scroll = document.querySelector('.js-chat-scroll');

      scroll.scrollTop = scroll.clientHeight;
    }
  }

  onAddChatList() {
    this.setState({ chatList: this.props.store.getChatList() });
  }

  hundleSubmit(e) {
    e.preventDefault();

    const target = e.target;
    const comment = target.comment.value;
    const { action } = this.props;

    action.sendMessage(comment);
    target.comment.value = '';
  }

  renderList() {
    // TODO: Key must change from index to chat's ID.
    return this.state.chatList.map((chat, i) => <li key={i}>{chat}</li>);
  }

  render() {
    return (
      <div>
        <div className="p-chat__inner js-chat-scroll">
          <div className="p-chat__box">
            <ul className="p-chat__list js-chat-scroll-list">
              {this.renderList()}
            </ul>
          </div>
        </div>

        <form className="p-chat__comment" onSubmit={this.hundleSubmit}>
          <div className="p-chat__comment__txt"><input className="p-chat__comment__txt__input" name="comment" type="text" placeholder="チャットを送る…" autoComplete="off" /></div>
          <input className="p-chat__comment__btn" type="submit" value="送信" />
        </form>
      </div>
    );
  }
}

ChatView.propTypes = {
  socket: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};
