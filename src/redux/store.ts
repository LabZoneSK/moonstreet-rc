/* eslint-disable no-undef */
/* Redux */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

import {configureStore} from '@reduxjs/toolkit';

/* Apply middleware to the store and create store */
// const storedState = JSON.parse(localStorage.getItem('moonstreet-local-storage')) ;
// const initialState = storedState || {};
// // eslint-disable-next-line no-underscore-dangle
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // Log the initial state
// const store = configureStore(
//   reducers,
//   initialState,
//   composeEnhancers(applyMiddleware(thunkMiddleware)),
// );

const store = configureStore ({ reducer: reducers})

/* Apply middleware to the store and create store */





export default store;



// const store = () => {

// }

// export default store;