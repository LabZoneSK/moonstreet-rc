import {
  RATE_ADD,
  RATES_INITIAL,
} from './constants';


/* Action Creators */
export function addRate(currency, rates) {
  return {
    type: RATE_ADD,
    currency,
    rates,
  };
}

export function addInitialRates(rates) {
  return {
    type: RATES_INITIAL,
    rates,
  };
}

