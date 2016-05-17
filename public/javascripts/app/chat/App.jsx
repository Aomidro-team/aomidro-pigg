import React from 'react';
import { render } from 'react-dom';
import events from 'events';

import Store from './Store';
import ChatView from './Components/ChatView';

const EventEmitter = new events.EventEmitter;
const store = new Store();

export default class ChatApp {
  constructor(socket, userName, chat) {
    this.socket = socket;
    this.chatWrap = chat;

    store.init(socket, userName, EventEmitter);
  }

  init() {
    render(
      <ChatView socket={this.socket} dispatcher={EventEmitter} store={store} />,
      this.chatWrap
    );
  }
}
