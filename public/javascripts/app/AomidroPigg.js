import 'babel-polyfill';
import io from 'socket.io-client';
import ChatApp from './chat/App';
import CanvasApp from './canvas/App';

class AomidroPigg {
  constructor(user, el) {
    this.fetchUrl = '/api/auth';
    this.user = user;
    this.el = el;
  }

  async start() {
    const token = await this.fetchToken();
    const socket = this.connectSocket(token);
    const chatApp = new ChatApp(socket, this.user.name, this.el.chat);
    const canvasApp = new CanvasApp(socket, this.user, this.el.canvas);

    chatApp.init();
    canvasApp.init();
  }

  fetchToken() {
    const data = JSON.stringify({
      username: this.user.name,
      password: this.user.password
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
