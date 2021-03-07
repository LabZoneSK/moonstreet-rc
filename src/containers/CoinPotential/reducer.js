
import { fromJS } from 'immutable';
import {
  COINT_LIST_ADD,
} from './constants';

/* TODO: Revisit if initial state below is needed, since it isn't really used for anything */
const initialState = fromJS({});


const coinPotentialReducer = (state = initialState, action) => {
  switch (action.type) {
    case COINT_LIST_ADD:
      return state
        .set(action.coinList, fromJS({ name: action.coinList }));
    default:
      return state;
  }
};

export default coinPotentialReducer;
