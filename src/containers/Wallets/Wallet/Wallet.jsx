/**
 *
 * Wallet
 *
 * Write description
 */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { database } from '../../../firebase';
import AssetsManager from '../AssetsManager';

import * as WalletsActions from '../actions';
import {
  showAssets,
  findWallet,
  findWalletKey,
} from '../WalletsUtils';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWalletName: '',
      currentWalletKey: '',
    };

    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    const { wallets, match } = this.props;
    const { walletID } = match.params;
    const walletKey = findWalletKey(wallets, walletID, 'name');

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      currentWalletName: walletID,
      currentWalletKey: walletKey,
    });
  }

  handleRemove() {
    const { removeWallet, user } = this.props;
    const { currentWalletName, currentWalletKey } = this.state;

    // eslint-disable-next-line no-undef
    if (window.confirm(`Are you sure you want to remove wallet ${currentWalletName}?`)) {
      database.ref(user.uid).child(`clients/own/wallets/${currentWalletKey}`).remove();

      removeWallet(currentWalletKey);
    }
  }

  render() {
    const { wallets, user } = this.props;
    const { currentWalletName } = this.state;

    // TODO: refactor wallet identification so we can save one object iteration
    const actualWallet = findWallet(wallets, currentWalletName, 'name');
    const { primaryFiat } = user.settings;

    if (actualWallet !== undefined) {
      const walletKey = findWalletKey(wallets, currentWalletName, 'name');

      if (actualWallet.assets === undefined) {
        return (
          <div>
            <h3>{currentWalletName}</h3>
            <AssetsManager />
            <p>No assets in wallet.</p>
            <button className="fe-btn" type="button" onClick={this.handleRemove}>Remove Wallet</button>
          </div>
        );
      }
      const assetsView = showAssets(actualWallet.assets, walletKey, primaryFiat);

      return (
        <div>
          <h3>
            {currentWalletName}
          </h3>

          <AssetsManager />

          <div>{assetsView}</div>

          <button className="fe-btn" type="button" onClick={this.handleRemove}>Remove Wallet</button>
        </div>
      );
    }
    return (
      <div>
        <p>
          There is no wallet named
          {` ${currentWalletName}`}
        </p>
      </div>
    );
  }
}

Wallet.propTypes = {
  wallets: ImmutablePropTypes.map.isRequired,
  removeWallet: PropTypes.func.isRequired,
  walletID: PropTypes.string,
  user: ImmutablePropTypes.map.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      walletID: PropTypes.string,
    }),
  }).isRequired,
};

Wallet.defaultProps = {
  walletID: '',
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...WalletsActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet));
