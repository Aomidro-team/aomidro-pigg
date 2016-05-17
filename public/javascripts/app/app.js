import AomidroPigg from './AomidroPigg';

const userName = document.querySelector('.js-user-name').value;
const userPassword = document.querySelector('.js-user-password').value;
const el = {
  chat: document.querySelector('.js-chat')
};
const aomidroPigg = new AomidroPigg(userName, userPassword, el);

aomidroPigg.start();
