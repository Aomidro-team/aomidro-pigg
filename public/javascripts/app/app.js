import connectSocket from './connectSocket';

const userName = document.querySelector('.js-user-name').textContent;
const userPassword = document.querySelector('.js-user-password').value;

fetch('/api/auth', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: userName,
    password: userPassword
  })
})
.then(response => response.json())
.then(json => {
  connectSocket(json.token, userName);
});
