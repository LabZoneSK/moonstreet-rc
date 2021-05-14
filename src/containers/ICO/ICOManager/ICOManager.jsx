import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { database } from '../../../firebase';

import { handleInputChangesGeneric } from '../../../utils/FormUtils';

import * as ICOActions from '../actions';

class ICOManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ICOName: '',
      initialInvestment: 0,
      initialInvestmentCurrency: '',
    };

    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
  }

  handleInputChange = (event) => {
    handleInputChangesGeneric(event, this);
  }

  handleAdd = (event) => {
    const {
      ICOName,
      initialInvestment,
      initialInvestmentCurrency,
      newICOName,
    } = this.state;
    const { user, addICO } = this.props;
    event.preventDefault();
    if (newICOName !== '') {
      const newICOObj = {
        name: ICOName,
        initialInvestment,
        initialInvestmentCurrency,
      };

      const newRef = database.ref(user.uid).child('clients/own/icos').push(newICOObj);

      newRef.then((newICO) => {
        addICO(newICO.key, newICOObj);
      });
    }
  }

  render() {
    const {
      ICOName,
      initialInvestment,
      initialInvestmentCurrency,
      investmentCurrencySymbol,
    } = this.state;

    return (
      <div>
        <form id="addICO">
          <label
            htmlFor="ICOName"
          >
            Name:
            <input
              type="text"
              name="ICOName"
              id="ICOName"
              value={ICOName}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <label
            htmlFor="initialInvestment"
          >
            Inital Investment Amount:
            <input
              type="number"
              name="initialInvestment"
              id="initialInvestment"
              value={initialInvestment}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <label
            htmlFor="initialInvestmentCurrency"
          >
            Inital Investment Currency:
            <input
              type="text"
              name="initialInvestmentCurrency"
              id="initialInvestmentCurrency"
              value={initialInvestmentCurrency}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label
            htmlFor="investmentCurrencySymbol"
          >
            Symbol:
            <input
              type="text"
              name="investmentCurrencySymbol"
              id="investmentCurrencySymbol"
              value={investmentCurrencySymbol}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <button
            type="button"
            onClick={this.handleAdd}
          >
            Add ICO
          </button>
        </form>
      </div>
    );
  }
}

ICOManager.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  addICO: PropTypes.func.isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...ICOActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ICOManager));
