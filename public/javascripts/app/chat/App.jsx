import React from 'react';
import { render } from 'react-dom';
import events from 'events';

import ActionCreator from './ActionCreator';
import Store from './Store';
import ChatView from './Component';

const EventEmitter = new events.EventEmitter;
const action = new ActionCreator(EventEmitter);
const store = new Store();

export default class ChatApp {
  constructor(socket, user, chat) {
    this.socket = socket;
    this.chatWrap = chat;

    store.init(socket, user, EventEmitter);
  }

  init() {
    render(
      <ChatView socket={this.socket} action={action} store={store} />,
      this.chatWrap
    );
  }
}
