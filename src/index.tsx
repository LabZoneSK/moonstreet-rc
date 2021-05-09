import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

/* Redux */
import { Provider } from 'react-redux';
import store from './redux/store';

/* Layout */
import App from './containers/App';

import registerServiceWorker from './registerServiceWorker';

/* JUST FOR DEVELOPMENT */
// Log the initial state
// console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
store.subscribe(() => {
  // console.log(store.getState());
  // eslint-disable-next-line no-undef
  localStorage.setItem('moonstreet-state-storage', JSON.stringify((store.getState())));
});

ReactDOM.render(
  (
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  // eslint-disable-next-line no-undef
  ), document.getElementById('root'),
);

registerServiceWorker();
