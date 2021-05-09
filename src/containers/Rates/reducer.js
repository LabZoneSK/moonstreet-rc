import { fromJS } from 'immutable';
import {
  RATE_ADD,
  RATES_INITIAL,
} from './constants';

/* TODO: Revisit if initial state below is needed, since it isn't really used for anything */
const initialState = fromJS({});

const RatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATE_ADD:
      return state
        .merge(fromJS({ [action.currency]: action.rates }));
    case RATES_INITIAL:
      return fromJS(action.rates);
    default:
      return state;
  }
};

export default RatesReducer;
