import {
  RATE24H_ADD
} from './constants';


/* Action Creators */
export function addRate24h(currency, rates) {
  return {
    type: RATE24H_ADD,
    currency,
    rates
  };
}