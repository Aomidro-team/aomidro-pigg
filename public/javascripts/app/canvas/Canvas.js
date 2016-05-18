class Canvas {
  constructor(socket, userName, canvas) {
    this.socket = socket;
    this.users = [];
    this.userName = userName;

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.me = {};

    this.speed = 5;
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
        current: {
          x: user.current.x || this.canvas.width / 2,
          y: user.current.y || this.canvas.height / 2
        },
        goal: {
          x: user.current.x || this.canvas.width / 2,
          y: user.current.y || this.canvas.height / 2
        }
      };

      return obj;
    });
  }

  events() {
    window.addEventListener('resize', this.setSize.bind(this), false);
    this.canvas.addEventListener('click', this.onCanvasClick.bind(this), false);

    this.socket.on('connect', this.setUser.bind(this));
  }

  drawScreen() {
    this.users = this.users.map(user => {
      const x = user.goal.x - user.current.x;
      const y = user.goal.y - user.current.y;
      const radian = Math.atan2(y, x);

      let xunit = Math.cos(radian) * this.speed;
      let yunit = Math.sin(radian) * this.speed;

      xunit = (x >= -this.speed && x <= this.speed) ? 0 : xunit;
      yunit = (y >= -this.speed && y <= this.speed) ? 0 : yunit;

      return Object.assign({}, user, {
        current: {
          x: user.current.x + xunit,
          y: user.current.y + yunit
        }
      });
    });

    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = '#000';

    this.users.forEach(user => {
      this.context.beginPath();
      this.context.arc(user.current.x, user.current.y, 15, 0, Math.PI * 2, true);
      this.context.fill();

      this.context.fillStyle = '#222';
      this.context.font = '18px "PT Sans"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'top';
      this.context.fillText(user.name, user.current.x, user.current.y + 18, 100);
    });

    requestAnimationFrame(this.drawScreen.bind(this));
  }

  setUser() {
    this.me = {
      name: this.userName,
      current: {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      },
      goal: {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      }
    };

    this.users.push(this.me);
  }

  onCanvasClick(e) {
    this.setGoalPoint(e);
  }

  setGoalPoint(e) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const positionX = rect.left + window.pageXOffset;
    const positionY = rect.top + window.pageYOffset;

    this.me.goal.x = e.pageX - positionX;
    this.me.goal.y = e.pageY - positionY;
  }
}

export default Canvas;
