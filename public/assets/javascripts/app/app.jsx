import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import UserOnly from './containers/auth/UserOnly';
import GuestOnly from './containers/auth/GuestOnly';
import Login from './containers/auth/Login';
import Signup from './containers/auth/Signup';
import Entrance from './containers/Entrance';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route component={UserOnly}>
          <IndexRoute component={Entrance} />
        </Route>
        <Route component={GuestOnly}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
