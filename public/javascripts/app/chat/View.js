class ChatView {
  constructor(el) {
    this.chatWrap = el.chatWrap;
    this.chatList = el.chatList;
    this.commentForm = el.commentForm;

    this.events();
  }

  events() {
    this.commentForm.addEventListener('submit', this.sendComment.bind(this), false);
  }

  addComment(value) {
    const element = document.createElement('li');
    element.innerHTML = value.msg;

    this.chatList.appendChild(element);
    this.chatWrap.scrollTop = this.chatWrap.scrollHeight;
  }

  sendComment(e) {
    e.preventDefault();

    
  }
}

export default ChatView;
