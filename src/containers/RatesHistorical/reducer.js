import { fromJS } from 'immutable';
import {
    RATE24H_ADD,
} from './constants';

/* TODO: Revisit if initial state below is needed, since it isn't really used for anything */
const initialState = fromJS({});


const RatesHistoricalReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATE24H_ADD:
      return state
        .merge(fromJS({ [action.currency] : action.rates }));
    default:
      return state;
  }
};

export default RatesHistoricalReducer;