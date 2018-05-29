/**
 *
 * Wallets
 *
 * Write description
 */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { database } from '../../../firebase';

import { handleInputChangesGeneric } from '../../../utils/FormUtils';

import * as PortfoliosActions from '../actions';
import { 
  showAssets,
  findWallet,
  mergeWallets,
  findWalletKey,
} from '../../Wallets/WalletsUtils/';

import { 
  findInMap,
  mergeMaps,
} from '../../../utils/Iterable';

class PortfoliosManager extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      newPortfolioName: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }


  handleAdd(e) {
    const { addPortfolio } = this.props;

    e.preventDefault();

    if (this.state.newPortfolioName != "") {

      if (this.props.portfolios != undefined) {

        // findWallet should be remaned into generic util
        let existingPortfolio = findInMap(this.props.portfolios, this.state.newPortfolioName, 'name');

      if (existingPortfolio != undefined) {
        alert('Portfolio already exists.')
      } else {

        let newRef = database.ref(this.props.user.getIn(['uid'])).child('clients/own/portfolios').push({
          name: this.state.newPortfolioName
        });

        addPortfolio(newRef.key, this.state.newPortfolioName);
      }
        
      } else {
        let newRef = database.ref(this.props.user.getIn(['uid'])).child('clients/own/portfolios').push({
          name: this.state.newPortfolioName
        });

        addPortfolio(newRef.key, this.state.newPortfolioName);
      }

    } else {
      alert('Name your portfolio.')
    }

  }

  render() {
    return (
      <div>
        <form id="addPortfolio">
          <input className="fe" type="text" name="newPortfolioName" value={this.state.newPortfolioName} onChange={this.handleInputChange} required />
          <button className="fe-btn" type="add" onClick={this.handleAdd}>Add Portfolio</button>
        </form>
      </div>
    )
  }
}


PortfoliosManager.propTypes = {
  addPortfolio: PropTypes.func.isRequired,
};

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...PortfoliosActions,
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PortfoliosManager));
