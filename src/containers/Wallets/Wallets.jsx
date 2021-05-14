/**
 *
 * Wallets
 *
 * Write description
 */

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WalletView from './Wallet';
import WalletsManager from './WalletsManager';

import {
  showAssets,
  findWallet,
  findWalletKey,
} from './WalletsUtils';

import { mergeObjectChildren } from '../../utils/Utils';

const Wallets = (props) => {
  const { wallets, match, user } = props;
  const { primaryFiat } = user.settings;
  let { walletID } = match.params;

  if (wallets !== undefined) {
    if (walletID === undefined) {
      if (wallets.size === 1) {
        // if there's only one wallet we'll show just that

        walletID = wallets.first().getIn(['name']);

        const actualWallet = findWallet(wallets, walletID, 'name');
        const walletKey = findWalletKey(wallets, walletID, 'name');

        if (actualWallet.assets === undefined) {
          return (
            <div>
              <WalletsManager />
              <p>No assets the only wallet</p>
            </div>
          );
        }

        const assetsView = showAssets(actualWallet.get('assets'), walletKey, primaryFiat);

        return (
          <div>
            <WalletsManager />
            {assetsView}
          </div>
        );
      }

      const totalWallet = mergeObjectChildren(wallets, 'assets');

      if (totalWallet.size === 0) {
        return (
          <div>
            <WalletsManager />
            <p>No assets in any of the wallets</p>
          </div>
        );
      }

      const assetsView = showAssets(totalWallet, undefined, primaryFiat);

      return (
        <div>
          <WalletsManager />
          <h3>All wallets</h3>
          {assetsView}
        </div>
      );
    }

    return (
      <div>
        <WalletView />
      </div>
    );
  }

  return (
    <div>
      <p>No wallet data</p>
    </div>
  );
};

Wallets.propTypes = {
  wallets: ImmutablePropTypes.map.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    settings: PropTypes.shape({
      primaryFiat: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      walletID: PropTypes.string,
    }),
  }).isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallets));
