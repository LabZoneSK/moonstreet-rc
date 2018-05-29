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

import * as WalletsActions from '../actions';

class AssetActions extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleAssetRemove = this.handleAssetRemove.bind(this);
  }


  handleAssetRemove(e) {
    const { removeAsset } = this.props;

    if (window.confirm("Are you sure you want to remove " + this.props.assetKey.toUpperCase() + "?")) {

      database.ref(this.props.user.getIn(['uid'])).child('clients/own/wallets/' + this.props.walletKey + '/assets/' + this.props.assetKey.toUpperCase()).remove();

      removeAsset(this.props.walletKey, this.props.assetKey.toUpperCase())
    }
  }

  render() {
    return (
      <div>
        <button className="fe-btn" onClick={this.handleAssetRemove}>x</button>
      </div>
    )
  }
}


AssetActions.propTypes = {
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
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetActions));
