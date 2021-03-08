import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { database } from '../../../firebase';
import { handleInputChangesGeneric } from '../../../utils/FormUtils';
import * as RatesActions from '../../Rates/actions';
import * as PortfoliosActions from '../actions';
import * as cc from '../../../cryptocompare';

class TradesManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPortfolioKey: '',
      date: '', // 2017-11-16
      orderType: '', // sell, buy, sell w BTC...
      currency: '', // XMR
      amount: 0,
      priceEUR: 0,
      priceBTC: 0,
    };

    this.handleTradeAdd = this.handleTradeAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentDidMount() {
    const { portfolioKey } = this.props;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      currentPortfolioKey: portfolioKey,
    });
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }

  handleTradeAdd() {
    const { addTrade, addRate } = this.props;

    const newRef = database.ref(this.props.user.getIn(['uid'])).child(`clients/own/portfolios/${this.state.currentPortfolioKey}/trades/`).push({
      date: this.state.date,
      orderType: this.state.orderType,
      currency: this.state.currency.toUpperCase(),
      amount: this.state.amount,
      priceEUR: this.state.priceEUR,
      priceBTC: this.state.priceBTC,
    });


    addTrade(
      this.state.currentPortfolioKey,
      newRef.key,
      this.state.date,
      this.state.orderType,
      this.state.currency.toUpperCase(),
      this.state.amount,
      this.state.priceEUR,
      this.state.priceBTC,
    );

    cc.priceFull(this.state.currency.toUpperCase(), ['BTC', 'USD', 'EUR'])
      .then((prices) => {
        addRate(this.state.currency.toUpperCase(), prices[this.state.currency.toUpperCase()]);
      }).catch(console.error);
  }


  render() {
    return (
      <div>
        <label htmlFor="dateInput">Date:</label>
        <input
          className="fe"
          type="date"
          id="dateInput"
          name="dateInput"
          placeholder="2017-11-16"
          value={this.state.date}
          onChange={this.handleInputChange}
        />
        <br />

        <label htmlFor="orderType">Order Type</label>
        <input
          className="fe"
          type="text"
          name="orderType"
          id="orderType"
          placeholder="sell/buy"
          value={this.state.orderType}
          onChange={this.handleInputChange}
        />
        <br />

        <label htmlFor="currency">Currency:</label>
        <input
          className="fe"
          type="text"
          name="currency"
          id="currency"
          placeholder="BTC"
          value={this.state.currency}
          onChange={this.handleInputChange}
        />
        <br />

        <label htmlFor="amount">Amount:</label>
        <input
          className="fe"
          type="number"
          name="amount"
          id="amount"
          placeholder="10"
          value={this.state.amount}
          onChange={this.handleInputChange}
        />
        <br />

        <label htmlFor="priceEUR">Price in EUR:</label>
        <input
          className="fe"
          type="number"
          name="priceEUR"
          id="priceEUR"
          placeholder="10"
          value={this.state.priceEUR}
          onChange={this.handleInputChange}
        />
        <br />

        <label htmlFor="priceBTC">Price in BTC:</label>
        <input
          className="fe"
          type="number"
          name="priceBTC"
          id="priceBTC"
          placeholder="10"
          value={this.state.priceBTC}
          onChange={this.handleInputChange}
        />
        <br />

        <button className="fe-btn" type="add" onClick={this.handleTradeAdd}>Add Trade</button>

      </div>
    );
  }
}

TradesManager.propTypes = {
  addTrade: PropTypes.func.isRequired,
  addRate: PropTypes.func.isRequired,
  portfolioKey: PropTypes.string.isRequired,
  user: ImmutablePropTypes.map.isRequired,
};

/* Container part */
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...PortfoliosActions,
  ...RatesActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TradesManager));
