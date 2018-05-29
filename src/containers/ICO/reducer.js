import { fromJS } from 'immutable';
import {
  ICO_ADD,
  ICO_REMOVE,
} from './constants';

/* TODO: Revisit if initial state below is needed, since it isn't really used for anything */
const initialState = fromJS({});


const icosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ICO_ADD:
      return state
        .set(action.key, fromJS(action.ICOObj));
    case ICO_REMOVE:
      return state
        .delete(action.key)
    default:
      return state;
  }
};

export default icosReducer;
