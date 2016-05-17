import React, { Component, PropTypes } from 'react';

export default class ChatView extends Component {
  constructor(props) {
    super(props);

    this.hundleSubmit = this.hundleSubmit.bind(this);
    this.scrollFlag = false;
    this.state = { chatList: props.store.getChatList() };

    props.dispatcher.on('addChatList', this.addChatList.bind(this));
    props.socket.on('connect', () => { props.dispatcher.emit('connectChat'); });
    window.addEventListener('beforeunload', () => { props.dispatcher.emit('disconnectChat'); });
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

  addChatList() {
    this.setState({ chatList: this.props.store.getChatList() });
  }

  hundleSubmit(e) {
    e.preventDefault();

    const target = e.target;
    const comment = target.comment.value;
    const { dispatcher } = this.props;

    dispatcher.emit('sendMessage', comment);
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
  dispatcher: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};
