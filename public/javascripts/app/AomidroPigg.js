import 'babel-polyfill';
import io from 'socket.io-client';
import ChatApp from './chat/App';
import Canvas from './canvas/Canvas';

class AomidroPigg {
  constructor(userName, userPassword, el) {
    this.fetchUrl = '/api/auth';
    this.userName = userName;
    this.userPassword = userPassword;
    this.el = el;
  }

  start() {
    (async () => {
      const token = await this.fetchToken();
      const socket = this.connectSocket(token);
      const chatApp = new ChatApp(socket, this.userName, this.el.chat);
      const canvas = new Canvas(socket, this.userName, this.el.canvas);

      chatApp.init();
      canvas.init();
    })();
  }

  fetchToken() {
    const data = JSON.stringify({
      username: this.userName,
      password: this.userPassword
    });

    return new Promise((resolve, reject) => {
      fetch(this.fetchUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: data
      })
      .then(response => response.json())
      .then(json => {
        resolve(json.token);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  connectSocket(token) {
    const socket = io.connect('', {
      query: `token=${token}`
    });

    return socket;
  }
}

export default AomidroPigg;
