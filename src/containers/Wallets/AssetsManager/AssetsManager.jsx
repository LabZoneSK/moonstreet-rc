/**
 *
 * Wallets
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

import { handleInputChangesGeneric } from '../../../utils/FormUtils';

import * as WalletsActions from '../actions';

import * as RatesActions from '../../Rates/actions';

import { findWalletKey } from '../WalletsUtils';

import * as cc from '../../../cryptocompare';

class AssetsManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assetKey: '',
      assetAmmount: '',
      currentWalletKey: '',
    };

    this.handleAssetAdd = this.handleAssetAdd.bind(this);
    this.handleAssetRemove = this.handleAssetRemove.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { wallets, match } = this.props;
    const { walletID } = match.params;
    const walletKey = findWalletKey(wallets, walletID, 'name');

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      currentWalletKey: walletKey,
    });
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }

  handleAssetAdd() {
    const {
      addAsset,
      addRate,
      user,
    } = this.props;
    const {
      assetKey,
      assetAmmount,
      currentWalletKey,
    } = this.state;

    if ((assetKey.toUpperCase() !== '')
        && (assetKey.toUpperCase() !== undefined)
        && (assetAmmount !== 0)
        && (assetAmmount !== undefined)) {
      database.ref(user.uid).child(`clients/own/wallets/${currentWalletKey}/assets/${assetKey.toUpperCase()}`).set(Number(assetAmmount));

      addAsset(
        currentWalletKey,
        assetKey.toUpperCase(),
        Number(assetAmmount),
      );

      // TODO: it might be worth to check, if the rate doesn't yet exist to prevent duplicite calls
      cc.priceFull(assetKey.toUpperCase(), ['BTC', 'USD', 'EUR'])
        .then((prices) => {
          addRate(assetKey.toUpperCase(), prices[assetKey.toUpperCase()]);
        }).catch(console.error);
    } else {
      alert('Missing key or ammount');
    }
  }

  handleAssetRemove() {
    const { removeAsset, user } = this.props;
    const {
      assetKey,
      currentWalletKey,
    } = this.state;

    // eslint-disable-next-line no-undef
    if (window.confirm(`Are you sure you want to remove ${assetKey.toUpperCase()}?`)) {
      database.ref(user.getIn(['uid'])).child(`clients/own/wallets/${currentWalletKey}/assets/${assetKey.toUpperCase()}`).remove();

      removeAsset(currentWalletKey, assetKey.toUpperCase());
    }
  }

  render() {
    const {
      assetKey,
      assetAmmount,
    } = this.state;
    return (
      <div>
        <input
          className="fe"
          placeholder="BTC"
          type="text"
          name="assetKey"
          value={assetKey}
          onChange={this.handleInputChange}
          required
        />
        <input
          className="fe"
          type="number"
          placeholder="10"
          name="assetAmmount"
          value={assetAmmount}
          onChange={this.handleInputChange}
          required
        />
        <button className="fe-btn" type="button" onClick={this.handleAssetAdd}>
          Add asset to wallet
        </button>
      </div>
    );
  }
}

AssetsManager.propTypes = {
  addRate: PropTypes.func.isRequired,
  addAsset: PropTypes.func.isRequired,
  removeAsset: PropTypes.func.isRequired,
  walletID: PropTypes.string,
  wallets: ImmutablePropTypes.map.isRequired,
  user: ImmutablePropTypes.map.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      walletID: PropTypes.string,
    }),
  }).isRequired,
};

AssetsManager.defaultProps = {
  walletID: '',
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...WalletsActions,
  ...RatesActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetsManager));
