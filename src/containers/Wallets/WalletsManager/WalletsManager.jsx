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
import ImmutablePropTypes from 'react-immutable-proptypes';
import { database } from '../../../firebase';

import { handleInputChangesGeneric } from '../../../utils/FormUtils';

import * as WalletsActions from '../actions';
import { findWallet } from '../WalletsUtils/';

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
    const { addWallet } = this.props;

    e.preventDefault();

    if (this.state.newWalletName !== '') {
      if (this.props.wallets !== undefined) {
        const existingWallet = findWallet(this.props.wallets, this.state.newWalletName, 'name');

        if (existingWallet !== undefined) {
          alert('Wallet already exists.');
        } else {
          const newRef = database.ref(this.props.user.getIn(['uid'])).child('clients/own/wallets').push({
            name: this.state.newWalletName,
          });

          addWallet(newRef.key, this.state.newWalletName);
        }
      } else {
        const newRef = database.ref(this.props.user.getIn(['uid'])).child('clients/own/wallets').push({
          name: this.state.newWalletName,
        });

        addWallet(newRef.key, this.state.newWalletName);
      }
    } else {
      alert('Name your wallet.');
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
    );
  }
}


WalletsManager.propTypes = {
  addWallet: PropTypes.func.isRequired,
  wallets: ImmutablePropTypes.map.isRequired,
  user: ImmutablePropTypes.map.isRequired,
};

/* Container part */
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...WalletsActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletsManager));
