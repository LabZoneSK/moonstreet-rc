import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
    event.preventDefault();
    if (this.state.newICOName !== '') {
      const newICOObj = {
        name: this.state.ICOName,
        initialInvestment: this.state.initialInvestment,
        initialInvestmentCurrency: this.state.initialInvestmentCurrency,
      };

      const newRef = database.ref(this.props.user.getIn(['uid'])).child('clients/own/icos').push(newICOObj);

      newRef.then((newICO) => {
        this.props.addICO(newICO.key, newICOObj);
      });
    } else {
      alert('Please, enter name for new ICO.');
    }
  }

  render() {
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
              value={this.state.ICOName}
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
              value={this.state.initialInvestment}
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
              value={this.state.initialInvestmentCurrency}
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
              value={this.state.investmentCurrencySymbol}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <button
            type="add"
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
  user: ImmutablePropTypes.map.isRequired,
  addICO: PropTypes.func.isRequired,
};

/* Container part */
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...ICOActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ICOManager));
