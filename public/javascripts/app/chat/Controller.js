import ChatView from './View';

class ChatController {
  constructor(socket, userName, el) {
    this.socket = socket;
    this.userName = userName;
    this.chatView = new ChatView(el);
  }

  init() {
    this.socket.on('connect', this.connectChat.bind(this));
    this.socket.on('message', this.chatView.addComment.bind(this.chatView));

    window.addEventListener('beforeunload', this.disconnectChat.bind(this), false);
    // this.commentForm.addEventListener('submit', this.sendComment.bind(this), false);
  }

  connectChat() {
    this.socket.emit('message', { msg: `${this.userName}が入室しました` });
  }

  disconnectChat() {
    this.socket.emit('message', { msg: `${this.userName}が退室しました` });
  }
}

export default ChatController;
