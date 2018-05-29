import {
  RATE_ADD
} from './constants';


/* Action Creators */
export function addRate(currency, rates) {
  return {
    type: RATE_ADD,
    currency,
    rates
  };
}