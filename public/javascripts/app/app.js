import connectSocket from './modules/connectSocket';

class AomidroPigg {
  constructor(userName, userPassword) {
    this.userName = userName;
    this.userPassword = userPassword;
  }

  start() {
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.userName,
        password: this.userPassword
      })
    })
    .then(response => response.json())
    .then(json => {
      connectSocket(json.token, this.userName);
    });
  }
}

const userName = document.querySelector('.js-user-name').textContent;
const userPassword = document.querySelector('.js-user-password').value;
const aomidroPigg = new AomidroPigg(userName, userPassword);

aomidroPigg.start();
