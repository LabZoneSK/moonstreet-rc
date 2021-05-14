import React from 'react';

import {
  findInMap,
} from '../../../utils/Iterable';
import { roundNumber } from '../../../utils/Math';
import AssetActions from '../AssetActions';
import GetValue from '../../Rates/GetValue';
import GetTotal from '../../Rates/GetTotal';

/* TODO: Need specify UI */
export function showAssets(assets, walletKey, primaryFiat) {
  if (assets !== null) {
    const assetsView = Object.keys(assets).map((assetKey) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={assetKey}>
        <td className="tLeft">{assetKey}</td>
        <td>{roundNumber(assets[assetKey], 3)}</td>
        <td>
          <GetValue assetKey={assetKey} assetVolume={assets[assetKey]} assetRate="BTC" />
        </td>
        <td>
          <GetValue assetKey={assetKey} assetVolume={assets[assetKey]} assetRate={primaryFiat} />
        </td>
        {walletKey !== undefined
          && (
            <td>
              <AssetActions assetKey={assetKey} walletKey={walletKey} />
            </td>
          )}
      </tr>
    ));

    return (
      <table className="tRight">
        <thead>
          <tr>
            <th className="tLeft">Currency</th>
            <th>Ammount</th>
            <th>BTC</th>
            <th>{primaryFiat}</th>
            {walletKey !== undefined
              && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {assetsView}
        </tbody>
        <tfoot>
          <tr className="sumRow">
            <td className="tLeft" colSpan="2">Sum</td>
            <td>
              <GetTotal assets={assets} assetRate="BTC" />
            </td>
            <td>
              <GetTotal assets={assets} assetRate={primaryFiat} />
            </td>
            {walletKey !== undefined
              && <td />}
          </tr>
        </tfoot>
      </table>
    );
  }
  return (
    <div>No assets found.</div>
  );
}

/**
 * Functions find wallet by specified key.
 *
 * @param {Immutable.Map} wallets
 * @param {String} walletID
 * @param {String} key
 * @return {Immutable.Map} actual wallet
 */
export function findWallet(wallets, walletID, key) {
  return findInMap(wallets, walletID, key);
}

/**
 * Function to find apropriate wallet key by wallet name.
 *
 * @param {Immutable.Map} wallets
 * @param {String} walletID
 * @param {String} key
 * @return {String} walletKey reference for firebase
 */
export function findWalletKey(wallets, walletID, key) {
  let lostNFound = '';
  Object.keys(wallets).forEach((needleKey) => {
    if (walletID === wallets[needleKey][key]) {
      lostNFound = needleKey;
    }
  });
  return lostNFound;
}
