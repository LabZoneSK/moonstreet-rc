
import { fromJS } from 'immutable';
import {
  WALLET_ADD,
  WALLET_REMOVE,
  ASSET_ADD,
  ASSET_REMOVE,
} from './constants';

/* TODO: Revisit if initial state below is needed, since it isn't really used for anything */
const initialState = fromJS({});


const walletsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_ADD:
      return state
        .set(action.walletKey, fromJS({ name: action.walletName }));
    case WALLET_REMOVE:
      return state
        .delete(action.walletKey)
    case ASSET_ADD:
      return state
        .mergeIn([ action.walletKey, 'assets'], fromJS({ [action.assetKey] : action.assetAmmount }));
    case ASSET_REMOVE:
      return state
        .deleteIn([ action.walletKey, 'assets', action.assetKey]);
    default:
      return state;
  }
};

export default walletsReducer;
