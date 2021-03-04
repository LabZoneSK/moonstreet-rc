import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
    }

    //this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleAdd = this.handleAdd.bind(this);
  }

  handleInputChange = (event) => {
    handleInputChangesGeneric(event, this);
  }

  handleAdd = (event) => {
    event.preventDefault();
    if(this.state.newICOName !== '') {
      const newICOObj = {
        name: this.state.ICOName,
        initialInvestment: this.state.initialInvestment,
        initialInvestmentCurrency: this.state.initialInvestmentCurrency
      };

      const newRef = database.ref(this.props.user.getIn(['uid'])).child('clients/own/icos').push(newICOObj);

      newRef.then((newICO) => {
        this.props.addICO(newICO.key, newICOObj);
      })

    } else {
      alert('Please, enter name for new ICO.');
    }
  }

  render() {
    return (
    <div>
      <form id="addICO">
        <label>
          Name:
          <input
            type="text"
            name="ICOName"
            value={this.state.ICOName}
            onChange={this.handleInputChange}
            required />
          </label>
          <br/>
          <label>
            Inital Investment Amount:
          <input
              type="number"
              name="initialInvestment"
              value={this.state.initialInvestment}
              onChange={this.handleInputChange}
              required />
          </label>
          <br/>
          <label>
            Inital Investment Currency:
          <input
              type="text"
              name="initialInvestmentCurrency"
              value={this.state.initialInvestmentCurrency}
              onChange={this.handleInputChange}
              required />
          </label>
          <label>
            Symbol:
            <input
              type="text"
              name="investmentCurrencySymbol"
              value={this.state.investmentCurrencySymbol}
              onChange={this.handleInputChange}
              required />
          </label>
          <br/>
          <button
            type="add"
            onClick={this.handleAdd}>
            Add ICO
          </button>
      </form>
    </div>
    );
  }
}

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...ICOActions,
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ICOManager));
