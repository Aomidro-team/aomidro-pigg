import events from 'events';

import ActionCreator from './ActionCreator';
import Store from './Store';
import CanvasView from './View';

const EventEmitter = new events.EventEmitter;
const action = new ActionCreator(EventEmitter);
const store = new Store();

export default class CanavsApp {
  constructor(socket, user, canvas) {
    this.socket = socket;
    this.canvas = canvas;

    store.init(socket, user, EventEmitter);
  }

  init() {
    const canvasView = new CanvasView({
      socket: this.socket,
      canvas: this.canvas,
      action,
      store
    });

    canvasView.init();
  }
}
