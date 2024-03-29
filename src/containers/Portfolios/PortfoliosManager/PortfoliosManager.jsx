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

import * as PortfoliosActions from '../actions';

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
        const existingPortfolio = Object.keys(portfolios).filter((pkey) => portfolios[pkey].name === newPortfolioName);

        if (existingPortfolio.length > 0) {
          // eslint-disable-next-line no-undef
          alert('Portfolio already exists.');
        } else {
          const newRef = database.ref(user.uid).child('clients/own/portfolios').push({
            name: newPortfolioName,
          });

          addPortfolio(newRef.key, newPortfolioName);
        }
      } else {
        const newRef = database.ref(user.uid).child('clients/own/portfolios').push({
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
  portfolios: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...PortfoliosActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PortfoliosManager));
