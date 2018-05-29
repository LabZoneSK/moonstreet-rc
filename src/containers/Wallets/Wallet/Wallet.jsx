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
      allWallets: '',
      currentWalletName: '',
      currentWalletKey: '',
    }

    this.handleRemove = this.handleRemove.bind(this);
  }


  componentDidMount() {
    let { walletID } = this.props.match.params;
    const { wallets } = this.props;
    const walletKey = findWalletKey(wallets, walletID, 'name');

    this.setState({
      allWallets: wallets,
      currentWalletName: walletID,
      currentWalletKey: walletKey
    })
  }


  handleRemove(e) {
    const { removeWallet } = this.props;

    if (window.confirm("Are you sure you want to remove wallet " + this.state.currentWalletName + "?")) {
      database.ref(this.props.user.getIn(['uid'])).child('clients/own/wallets/' + this.state.currentWalletKey).remove();

      removeWallet(this.state.currentWalletKey)
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
      } else {
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
    } else {
      return (
        <div>
          <p>There's no wallet named {this.state.currentWalletName}</p>
        </div>          
      )
    }
  }
}

Wallet.propTypes = {
  wallets: ImmutablePropTypes.map.isRequired,
  removeWallet: PropTypes.func.isRequired,
  addAsset: PropTypes.func.isRequired,
};

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...WalletsActions,
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet));
