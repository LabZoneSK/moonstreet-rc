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

import * as WalletsActions from '../actions';

class AssetActions extends React.Component {
  constructor(props) {
    super(props);

    this.handleAssetRemove = this.handleAssetRemove.bind(this);
  }

  handleAssetRemove() {
    const {
      removeAsset,
      assetKey,
      walletKey,
      user,
    } = this.props;

    // eslint-disable-next-line no-undef
    if (window.confirm(`Are you sure you want to remove ${assetKey.toUpperCase()}?`)) {
      database.ref(user.uid).child(`clients/own/wallets/${walletKey}/assets/${assetKey.toUpperCase()}`).remove();

      removeAsset(walletKey, assetKey.toUpperCase());
    }
  }

  render() {
    return (
      <div>
        <button className="fe-btn" type="button" onClick={this.handleAssetRemove}>x</button>
      </div>
    );
  }
}

AssetActions.propTypes = {
  removeAsset: PropTypes.func.isRequired,
  assetKey: PropTypes.string.isRequired,
  walletKey: PropTypes.string.isRequired,
  user: ImmutablePropTypes.map.isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...WalletsActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetActions));
