export default class CanvasView {
  constructor(props) {
    const initPos = {
      x: (innerWidth - 300 - 10) / 2,
      y: (innerHeight - 10) / 2
    };

    this.props = props;
    this.canvas = props.canvas;
    this.context = this.canvas.getContext('2d');
    this.state = { users: props.store.getUsers() };

    window.addEventListener('resize', this.setSize.bind(this), false);
    this.canvas.addEventListener('click', this.setGoalPos.bind(this), false);

    props.socket.on('connect', props.action.connectCanvas.bind(props.action, initPos));
    props.store.on('addUser', this.onAddUser.bind(this));
    props.store.on('changePos', this.onChangePos.bind(this));
  }

  init() {
    this.setSize();
    this.drawScreen();
  }

  setSize() {
    this.canvas.width = innerWidth - 300 - 10;
    this.canvas.height = innerHeight - 10;
  }

  onAddUser() {
    this.state = { users: this.props.store.getUsers() };
  }

  onChangePos() {
    this.state = { users: this.props.store.getUsers() };
  }

  setGoalPos(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;

    this.props.action.setSelfGoalPos({ x, y });
  }

  drawScreen() {
    this.addBg();

    this.state.users = this.state.users.map(this.updateCurrentPos.bind(this));

    this.state.users.forEach(user => {
      this.addUserBody(user);
      this.addUserName(user);
    });

    requestAnimationFrame(this.drawScreen.bind(this));
  }

  addBg() {
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateCurrentPos(user) {
    const x = user.goal.x - user.current.x;
    const y = user.goal.y - user.current.y;
    const radian = Math.atan2(y, x);

    let newUser = undefined;
    let xunit = Math.cos(radian) * user.speed;
    let yunit = Math.sin(radian) * user.speed;

    xunit = (x >= -user.speed && x <= user.speed) ? 0 : xunit;
    yunit = (y >= -user.speed && y <= user.speed) ? 0 : yunit;
    newUser = Object.assign({}, user, {
      current: {
        x: user.current.x + xunit,
        y: user.current.y + yunit
      }
    });

    this.props.action.updateCurrentPos(newUser);

    return newUser;
  }

  addUserBody(user) {
    this.context.fillStyle = '#000';
    this.context.beginPath();
    this.context.arc(user.current.x, user.current.y, 15, 0, Math.PI * 2, true);
    this.context.fill();
  }

  addUserName(user) {
    this.context.fillStyle = '#222';
    this.context.font = '18px "PT Sans"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'top';
    this.context.fillText(user.name, user.current.x, user.current.y + 18, 100);
  }
}
