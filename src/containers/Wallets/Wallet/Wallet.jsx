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
    // eslint-disable-next-line react/prop-types
    const { walletID } = this.props.match.params;
    const { wallets } = this.props;
    const walletKey = findWalletKey(wallets, walletID, 'name');

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      currentWalletName: walletID,
      currentWalletKey: walletKey,
    });
  }


  handleRemove() {
    const { removeWallet } = this.props;

    // eslint-disable-next-line no-undef
    if (window.confirm(`Are you sure you want to remove wallet ${this.state.currentWalletName}?`)) {
      database.ref(this.props.user.getIn(['uid'])).child(`clients/own/wallets/${this.state.currentWalletKey}`).remove();

      removeWallet(this.state.currentWalletKey);
    }
  }

  render() {
    const { wallets } = this.props;

    const actualWallet = findWallet(wallets, this.state.currentWalletName, 'name');

    if (actualWallet !== undefined) {
      const walletKey = findWalletKey(wallets, this.state.currentWalletName, 'name');

      if (actualWallet.get('assets') === undefined) {
        return (
          <div>
            <h3>{this.state.currentWalletName}</h3>
            <AssetsManager />
            <p>No assets in wallet.</p>
            <button className="fe-btn" type="remove" onClick={this.handleRemove}>Remove Wallet</button>
          </div>
        );
      }
      const assetsView = showAssets(actualWallet.get('assets'), walletKey);

      return (
        <div>
          <h3>{this.state.currentWalletName}</h3>

          <AssetsManager />

          <div>{assetsView}</div>

          <button className="fe-btn" type="remove" onClick={this.handleRemove}>Remove Wallet</button>
        </div>
      );
    }
    return (
      <div>
        <p>There is no wallet named {this.state.currentWalletName}</p>
      </div>
    );
  }
}

Wallet.propTypes = {
  wallets: ImmutablePropTypes.map.isRequired,
  removeWallet: PropTypes.func.isRequired,
  walletID: PropTypes.string,
  user: ImmutablePropTypes.map.isRequired,
};

Wallet.defaultProps = {
  walletID: '',
};

/* Container part */
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...WalletsActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet));
