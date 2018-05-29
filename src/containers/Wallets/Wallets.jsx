/**
 *
 * Wallets
 *
 * Write description
 */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WalletView from './Wallet';
import WalletsManager from './WalletsManager';


import {
  showAssets,
  findWallet,
  mergeWallets,
  findWalletKey,
} from './WalletsUtils/';


class Wallets extends React.Component {

  render() {

    const { wallets } = this.props;
    let { walletID } = this.props.match.params;

    if (wallets != undefined) {

      if (walletID === undefined) {

        if (wallets.size === 1) {
          // if there's only one wallet we'll show just that

          let walletID = wallets.first().getIn(['name']);

          const actualWallet = findWallet(wallets, walletID, 'name');
          const walletKey = findWalletKey(wallets, walletID, 'name');

          if (actualWallet.get('assets') === undefined) {
            return (
              <div>
                <WalletsManager />
                <p>No assets the only wallet</p>
              </div>
            );
          } else {

            const assetsView = showAssets(actualWallet.get('assets'), walletKey);

            return (
              <div>
                <WalletsManager />
                {assetsView}
              </div>
            );
          }

        } else {
          const totalWallet = mergeWallets(wallets);

          if (totalWallet.size === 0) {

            return (
              <div>
                <WalletsManager />
                <p>No assets in any of the wallets</p>
              </div>
            )
          } else {

            const assetsView = showAssets(totalWallet);

            return (
              <div>
                <WalletsManager />
                <h3>All wallets</h3>
                {assetsView}
              </div>
            );
          }

        }


      } else {
        return (
          <div>
            <WalletView />
          </div>
        )
      }
    } else {
      return (
        <div>
          <p>No wallet data</p>
        </div>
      )
    }
  }
}

Wallets.propTypes = {
  wallets: ImmutablePropTypes.map.isRequired,
};

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallets));
