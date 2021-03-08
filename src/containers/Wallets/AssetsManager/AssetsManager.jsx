/**
 *
 * Wallets
 *
 * Write description
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { database } from '../../../firebase';

import { handleInputChangesGeneric } from '../../../utils/FormUtils';

import * as WalletsActions from '../actions';

import * as RatesActions from '../../Rates/actions';

import { findWalletKey } from '../WalletsUtils/';

import * as cc from '../../../cryptocompare';

class AssetsManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      assetKey: '',
      assetAmmount: '',
      currentWalletName: '',
      currentWalletKey: '',
    };

    this.handleAssetAdd = this.handleAssetAdd.bind(this);
    this.handleAssetRemove = this.handleAssetRemove.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    let { walletID } = this.props.match.params;
    const { wallets } = this.props;
    const walletKey = findWalletKey(wallets, walletID, 'name');

    this.setState({
      currentWalletName: walletID,
      currentWalletKey: walletKey
    })
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }

  handleAssetAdd(e) {
    const { addAsset, addRate } = this.props;

    if ((this.state.assetKey.toUpperCase() !== "") &&
        (this.state.assetKey.toUpperCase() !== undefined) &&
        (this.state.assetAmmount !== 0) &&
        (this.state.assetAmmount !== undefined)) {

          database.ref(this.props.user.getIn(['uid'])).child('clients/own/wallets/' + this.state.currentWalletKey + '/assets/' + this.state.assetKey.toUpperCase()).set(Number(this.state.assetAmmount));

          addAsset(this.state.currentWalletKey, this.state.assetKey.toUpperCase(), Number(this.state.assetAmmount))

          // TODO: it might be worth to check, if the rate doesn't yet exist to prevent duplicite calls
          cc.priceFull(this.state.assetKey.toUpperCase(), ['BTC', 'USD', 'EUR'])
            .then(prices => {
              addRate(this.state.assetKey.toUpperCase(), prices[this.state.assetKey.toUpperCase()])
            }).catch(console.error)

    } else {
      alert("Missing key or ammount")
    }
  }

  handleAssetRemove(e) {
    const { removeAsset } = this.props;

    if (window.confirm("Are you sure you want to remove " + this.state.assetKey.toUpperCase() + "?")) {

      database.ref(this.props.user.getIn(['uid'])).child('clients/own/wallets/' + this.state.currentWalletKey + '/assets/' + this.state.assetKey.toUpperCase()).remove();

      removeAsset(this.state.currentWalletKey, this.state.assetKey.toUpperCase())
    }
  }

  render() {
    return (
      <div>
        <input className="fe" placeholder="BTC" type="text" name="assetKey" value={this.state.assetKey} onChange={this.handleInputChange} required />
        <input className="fe" type="number" placeholder="10" name="assetAmmount" value={this.state.assetAmmount} onChange={this.handleInputChange} required />
        <button className="fe-btn" type="add" onClick={this.handleAssetAdd}>Add asset to wallet</button>
      </div>
    )
  }
}


AssetsManager.propTypes = {
  addWallet: PropTypes.func.isRequired,
  addRate: PropTypes.func.isRequired,
  addAsset: PropTypes.func.isRequired,
  removeAsset: PropTypes.func.isRequired,
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
    ...RatesActions,
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetsManager));
