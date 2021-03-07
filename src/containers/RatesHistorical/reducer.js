import { fromJS } from 'immutable';
import {
    RATE24H_ADD,
    RATES24H_INITIAL,
} from './constants';

/* TODO: Revisit if initial state below is needed, since it isn't really used for anything */
const initialState = fromJS({});


const RatesHistoricalReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATE24H_ADD:
      return state
        .merge(fromJS({ [action.currency]: action.rates }));
    case RATES24H_INITIAL:
      return fromJS(action.rates24h);
    default:
      return state;
  }
};

export default RatesHistoricalReducer;
