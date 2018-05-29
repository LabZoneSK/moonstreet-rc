import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

/* Redux */
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './redux/reducers';
import store from './redux/store'

/* Layout */
import App from './containers/App';


/* JUST FOR DEVELOPMENT */
// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
  localStorage.setItem('moonstreet-state-storage', JSON.stringify((store.getState())));
});

const browserHistory = Router.browserHistory;
ReactDOM.render((
  <Provider store={store} >
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();