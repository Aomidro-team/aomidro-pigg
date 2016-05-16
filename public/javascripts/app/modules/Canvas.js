class Canvas {
  constructor(socket, userName) {
    this.socket = socket;
    this.users = [];
    this.userName = userName;

    this.canvas = document.getElementById('js-canvas');
    this.context = this.canvas.getContext('2d');
    this.me = {};
  }

  init() {
    this.setSize();
    this.events();
    this.drawScreen();
  }

  setSize() {
    this.canvas.width = innerWidth - 300 - 10;
    this.canvas.height = innerHeight - 10;

    this.users = this.users.map(user => {
      const obj = {
        name: user.name,
        position: {
          x: this.canvas.width / 2,
          y: this.canvas.height / 2
        }
      };

      return obj;
    });
  }

  events() {
    window.addEventListener('resize', this.setSize.bind(this), false);
    this.canvas.addEventListener('click', this.move.bind(this), false);

    this.socket.on('connect', this.setUser.bind(this));
  }

  drawScreen() {
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = '#000';

    this.users.forEach(user => {
      this.context.beginPath();
      this.context.arc(user.position.x, user.position.y, 15, 0, Math.PI * 2, true);
      this.context.fill();
    });

    requestAnimationFrame(this.drawScreen.bind(this));
  }

  setUser() {
    this.me = {
      name: this.userName,
      position: {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      }
    };

    this.users.push(this.me);
  }

  move(e) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const positionX = rect.left + window.pageXOffset;
    const positionY = rect.top + window.pageYOffset;

    this.me.position.x = e.pageX - positionX;
    this.me.position.y = e.pageY - positionY;
  }
}

export default Canvas;
