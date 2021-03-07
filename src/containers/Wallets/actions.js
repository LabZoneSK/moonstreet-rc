import {
  WALLET_ADD,
  WALLET_REMOVE,
  ASSET_ADD,
  ASSET_REMOVE,
  WALLETS_INITIAL,
} from './constants';


/* Action Creators */
export function addWallet(walletKey, walletName) {
  return {
    type: WALLET_ADD,
    walletKey,
    walletName,
  };
}

export function removeWallet(walletKey) {
  return {
    type: WALLET_REMOVE,
    walletKey,
  };
}

export function addAsset(walletKey, assetKey, assetAmmount) {
  return {
    type: ASSET_ADD,
    walletKey,
    assetKey,
    assetAmmount,
  };
}

export function removeAsset(walletKey, assetKey) {
  return {
    type: ASSET_REMOVE,
    walletKey,
    assetKey,
  };
}

export function setInitialWallets(walletData) {
  return {
    type: WALLETS_INITIAL,
    walletData,
  };
}
