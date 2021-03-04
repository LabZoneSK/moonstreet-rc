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
import { findWallet } from '../WalletsUtils/';

class WalletsManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newWalletName: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }


  handleAdd(e) {
    const { addWallet } = this.props;

    e.preventDefault();

    if (this.state.newWalletName !== "") {

      if (this.props.wallets !== undefined) {
        let existingWallet = findWallet(this.props.wallets, this.state.newWalletName, 'name');

      if (existingWallet !== undefined) {
        alert('Wallet already exists.')
      } else {

        let newRef = database.ref(this.props.user.getIn(['uid'])).child('clients/own/wallets').push({
          name: this.state.newWalletName
        });

        addWallet(newRef.key, this.state.newWalletName);
      }

      } else {
        let newRef = database.ref(this.props.user.getIn(['uid'])).child('clients/own/wallets').push({
          name: this.state.newWalletName
        });

        addWallet(newRef.key, this.state.newWalletName);
      }

    } else {
      alert('Name your wallet.')
    }

  }

  render() {
    return (
      <div>
        <form id="addWallet">
          <input className="fe" type="text" name="newWalletName" value={this.state.newWalletName} onChange={this.handleInputChange} required />
          <button className="fe-btn" type="add" onClick={this.handleAdd}>Add Wallet</button>
        </form>
      </div>
    )
  }
}


WalletsManager.propTypes = {
  addWallet: PropTypes.func.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletsManager));
