import {
  RATE_ADD,
  RATES_INITIAL,
} from './constants';

const RatesReducer = (state = {}, action) => {
  switch (action.type) {
    case RATE_ADD:
      return {
        ...state,
        [action.currency]: action.rates,
      };
    case RATES_INITIAL:
      return action.rates;
    default:
      return state;
  }
};

export default RatesReducer;
