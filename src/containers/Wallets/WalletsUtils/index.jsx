import React from 'react';

import {
  findInMap,
  mergeMaps,
} from '../../../utils/Iterable';
import { roundNumber } from '../../../utils/Math';
import AssetActions from '../AssetActions';
import GetValue from '../../Rates/GetValue';
import GetTotal from '../../Rates/GetTotal';

/* TODO: Need specify UI */
export function showAssets(assets, walletKey) {
  if (assets !== null) {
    const assetsView = assets.toSeq().map((amount, symbol) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={symbol}>
        <td className="tLeft">{symbol}</td>
        <td>{amount}</td>
        <td>
          <GetValue assetKey={symbol} assetVolume={amount} assetRate="BTC" />
        </td>
        <td>
          <GetValue assetKey={symbol} assetVolume={amount} assetRate="EUR" />
        </td>
        <td>
          <GetValue assetKey={symbol} assetVolume={amount} assetRate="USD" />
        </td>
        {walletKey !== undefined
          && (
            <td>
              <AssetActions assetKey={symbol} walletKey={walletKey} />
            </td>
          )}
      </tr>
    )).valueSeq().toArray();

    return (
      <table className="tRight">
        <thead>
          <tr>
            <th className="tLeft">Currency</th>
            <th>Ammount</th>
            <th>BTC</th>
            <th>EUR</th>
            <th>USD</th>
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
              <GetTotal assets={assets} assetRate="EUR" />
            </td>
            <td>
              <GetTotal assets={assets} assetRate="USD" />
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
 * Function merge all assets from wallets.
 *
 * @param {Immutable.Map} wallets
 * @return {Immutable.Map} merged wallet
 */
export function mergeWallets(wallets) {
  return mergeMaps(wallets, 'assets', (sum, current) => roundNumber(sum + current, 12));
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
  // identify displayed right now in wallet container
  return wallets.keySeq().toArray().filter((e) => (
    walletID === (wallets.getIn([e, key]))
  )).toString();
}
