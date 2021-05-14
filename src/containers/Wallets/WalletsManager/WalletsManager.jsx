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
import { findWallet } from '../WalletsUtils';

class WalletsManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newWalletName: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }

  handleAdd(e) {
    const { addWallet, wallets, user } = this.props;
    const { newWalletName } = this.state;

    e.preventDefault();

    if (newWalletName !== '') {
      if (wallets !== undefined) {
        const existingWallet = findWallet(wallets, newWalletName, 'name');

        if (existingWallet !== undefined) {
          alert('Wallet already exists.');
        } else {
          const newRef = database.ref(user.uid).child('clients/own/wallets').push({
            name: newWalletName,
          });

          addWallet(newRef.key, newWalletName);
        }
      } else {
        const newRef = database.ref(user.uid).child('clients/own/wallets').push({
          name: newWalletName,
        });

        addWallet(newRef.key, newWalletName);
      }
    } else {
      alert('Name your wallet.');
    }
  }

  render() {
    const { newWalletName } = this.state;

    return (
      <div>
        <form id="addWallet">
          <input className="fe" type="text" name="newWalletName" value={newWalletName} onChange={this.handleInputChange} required />
          <button className="fe-btn" type="button" onClick={this.handleAdd}>Add Wallet</button>
        </form>
      </div>
    );
  }
}

WalletsManager.propTypes = {
  addWallet: PropTypes.func.isRequired,
  wallets: PropTypes.shape().isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    settings: PropTypes.shape({
      primaryFiat: PropTypes.string,
    }),
  }).isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...WalletsActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletsManager));
