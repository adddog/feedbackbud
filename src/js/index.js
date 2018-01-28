import 'babel-polyfill';
import '../css/vars/fonts.css';
window.Modernizr = window.Modernizr || {}
import './index.css';
import 'whatwg-fetch';

import {
  REQUEST_PREMIERE_PROJECT_CHILDREN
} from 'actions/actionTypes';

import { logGreen } from 'common/log';
import { throttle } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { createBrowserHistory, createHashHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';

import { syncHistoryWithStore } from 'react-router-redux';
import { calculateResponsiveState } from 'redux-responsive';

import configureStore from 'store/configureStore';
import configureRoutes from 'routes/configureRoutes';

import { Router } from 'react-router-dom';

const browserHistory = createBrowserHistory();
const store = configureStore({
  browserHistory
});

const throttleResize = throttle(() => {
  store.dispatch(calculateResponsiveState(window));
}, 400);
window.addEventListener('resize', () => throttleResize());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      {configureRoutes()}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);

logGreen(`process.env.DEV ${process.env.DEV}`)

