import {
  RATE24H_ADD,
  RATES24H_INITIAL,
} from './constants';


/* Action Creators */
export function addRate24h(currency, rates) {
  return {
    type: RATE24H_ADD,
    currency,
    rates,
  };
}

export function addInitialRates24h(rates24h) {
  return {
    type: RATES24H_INITIAL,
    rates24h,
  };
}
