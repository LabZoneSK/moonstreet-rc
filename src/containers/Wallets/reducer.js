import { removeKey } from '../../utils/Utils';
import {
  WALLET_ADD,
  WALLET_REMOVE,
  ASSET_ADD,
  ASSET_REMOVE,
  WALLETS_INITIAL,
} from './constants';

const walletsReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_ADD:
      return {
        ...state,
        [action.walletKey]: { name: action.walletName },
      };
    case WALLET_REMOVE:
      return removeKey(state, action.walletKey);
    case ASSET_ADD:
      return {
        ...state,
        [action.walletKey]: {
          ...state[action.walletKey],
          assets: {
            ...state[action.walletKey].assets,
            [action.assetKey]: action.assetAmmount,
          },
        },
      };
    case ASSET_REMOVE:
      return {
        ...state,
        [action.walletKey]: {
          ...state[action.walletKey],
          assets: removeKey(state[action.walletKey].assets, action.assetKey),
        },
      };
    case WALLETS_INITIAL:
      return action.walletData;
    default:
      return state;
  }
};

export default walletsReducer;
