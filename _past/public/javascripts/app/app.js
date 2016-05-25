import AomidroPigg from './AomidroPigg';

const user = {
  id: document.querySelector('.js-user-id').value,
  name: document.querySelector('.js-user-name').value,
  password: document.querySelector('.js-user-password').value
};
const el = {
  chat: document.querySelector('.js-chat'),
  canvas: document.querySelector('.js-canvas')
};
const aomidroPigg = new AomidroPigg(user, el);

aomidroPigg.start();
