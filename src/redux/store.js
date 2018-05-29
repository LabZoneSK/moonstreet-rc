/* Redux */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

/* Apply middleware to the store and create store */
const storedState = JSON.parse(localStorage.getItem('moonstreet-local-storage'));
const initialState = storedState || {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Log the initial state
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
    ),
  ),
);

export default store;
