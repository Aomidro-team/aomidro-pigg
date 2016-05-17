import AomidroPigg from './AomidroPigg';

const userName = document.querySelector('.js-user-name').value;
const userPassword = document.querySelector('.js-user-password').value;
const el = {
  chat: {
    chatWrap: document.querySelector('.js-chat'),
    chatList: document.querySelector('.js-chat-list'),
    commentForm: document.querySelector('.js-chat-form')
  }
};
const aomidroPigg = new AomidroPigg(userName, userPassword, el);

aomidroPigg.start();
