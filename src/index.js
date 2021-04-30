import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

/* Sentry */
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

/* Redux */
import { Provider } from 'react-redux';
import store from './redux/store';

/* Layout */
import App from './containers/App';

import registerServiceWorker from './registerServiceWorker';

Sentry.init({
  dsn: 'https://a5f20620a0994372941124e0b6b519f3@o592704.ingest.sentry.io/5741263',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


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

const { browserHistory } = Router;
ReactDOM.render(
  (
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>
  // eslint-disable-next-line no-undef
  ), document.getElementById('root'),
);

registerServiceWorker();
