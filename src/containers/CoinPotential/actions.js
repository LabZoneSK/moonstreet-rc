import {
  COINT_LIST_ADD,
} from './constants';

/* Action Creators */
export function addCoinList(coinList) {
  return {
    type: COINT_LIST_ADD,
    coinList,
  };
}
