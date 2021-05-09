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

import * as PortfoliosActions from '../actions';

import { findInMap } from '../../../utils/Iterable';

class PortfoliosManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPortfolioName: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }

  handleAdd(e) {
    const {
      addPortfolio,
      portfolios,
      user,
    } = this.props;
    const {
      newPortfolioName,
    } = this.state;

    e.preventDefault();

    if (newPortfolioName !== '') {
      if (portfolios !== undefined) {
        // findWallet should be remaned into generic util
        const existingPortfolio = findInMap(portfolios, newPortfolioName, 'name');

        if (existingPortfolio !== undefined) {
          // eslint-disable-next-line no-undef
          alert('Portfolio already exists.');
        } else {
          const newRef = database.ref(user.getIn(['uid'])).child('clients/own/portfolios').push({
            name: newPortfolioName,
          });

          addPortfolio(newRef.key, newPortfolioName);
        }
      } else {
        const newRef = database.ref(user.getIn(['uid'])).child('clients/own/portfolios').push({
          name: newPortfolioName,
        });

        addPortfolio(newRef.key, newPortfolioName);
      }
    } else {
      // eslint-disable-next-line no-undef
      alert('Name your portfolio.');
    }
  }

  render() {
    const {
      newPortfolioName,
    } = this.state;

    return (
      <div>
        <form id="addPortfolio">
          <input
            className="fe"
            type="text"
            name="newPortfolioName"
            value={newPortfolioName}
            onChange={this.handleInputChange}
            required
          />
          <button className="fe-btn" type="button" onClick={this.handleAdd}>Add Portfolio</button>
        </form>
      </div>
    );
  }
}

PortfoliosManager.propTypes = {
  addPortfolio: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-typos
  portfolios: ImmutablePropTypes.map.isRequired,
  user: ImmutablePropTypes.map.isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...PortfoliosActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PortfoliosManager));
