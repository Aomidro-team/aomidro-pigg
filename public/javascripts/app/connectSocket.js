import io from 'socket.io-client';

const connectSocket = (token, userName) => {
  const socket = io.connect('', {
    query: `token=${token}`
  });
  const socketCallbacks = new SocketCallbacks(socket, userName);

  socketCallbacks.events();
};

class SocketCallbacks {
  constructor(socket, userName) {
    this.socket = socket;

    this.userName = userName;
    this.chatWrap = document.querySelector('.js-chat');
    this.chatList = document.querySelector('.js-chat-list');
    this.commentForm = document.querySelector('.js-chat-form');
  }

  events() {
    this.socket.on('connect', this.connectChat.bind(this));
    this.socket.on('message', this.renderChat.bind(this));

    window.addEventListener('beforeunload', this.disconnectChat.bind(this), false);
    this.commentForm.addEventListener('submit', this.sendComment.bind(this), false);
  }

  connectChat() {
    this.socket.emit('message', { msg: `${this.userName}が入室しました` });
  }

  disconnectChat() {
    this.socket.emit('message', { msg: `${this.userName}が退室しました` });
  }

  renderChat(value) {
    const element = document.createElement('li');
    element.innerHTML = value.msg;

    this.chatList.appendChild(element);
    this.chatWrap.scrollTop = this.chatWrap.scrollHeight;
  }

  sendComment(e) {
    e.preventDefault();

    const target = e.target;
    const comment = target.comment.value;

    this.socket.emit('message', { msg: `${this.userName}: ${comment}` });
    target.comment.value = '';
  }
}

export default connectSocket;
