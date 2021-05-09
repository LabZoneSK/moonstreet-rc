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
    const { addTrade, addRate, user } = this.props;
    const {
      date,
      orderType,
      currency,
      amount,
      priceBTC,
      priceEUR,
      currentPortfolioKey,
    } = this.state;

    const newRef = database.ref(user.getIn(['uid'])).child(`clients/own/portfolios/${currentPortfolioKey}/trades/`).push({
      date,
      orderType,
      currency: currency.toUpperCase(),
      amount,
      priceEUR,
      priceBTC,
    });

    addTrade(
      currentPortfolioKey,
      newRef.key,
      date,
      orderType,
      currency.toUpperCase(),
      amount,
      priceEUR,
      priceBTC,
    );

    cc.priceFull(currency.toUpperCase(), ['BTC', 'USD', 'EUR'])
      .then((prices) => {
        addRate(currency.toUpperCase(), prices[currency.toUpperCase()]);
      }).catch(console.error);
  }

  render() {
    const {
      dateInput,
      currency,
      amount,
      priceBTC,
      priceEUR,
    } = this.state;

    return (
      <div>
        <label htmlFor="date">
          Date:
        </label>
        <input
          className="fe"
          type="date"
          id="date"
          name="date"
          placeholder="2017-11-16"
          value={dateInput}
          onChange={this.handleInputChange}
        />

        <br />

        <label htmlFor="orderType">
          Order Type
        </label>
        <select
          className="fe"
          id="orderType"
          name="orderType"
          onChange={this.handleInputChange}
        >
          <option value="">Choose</option>
          <option value="sell">Sell</option>
          <option value="buy">Buy</option>
        </select>
        <br />

        <label htmlFor="currency">
          Currency:
        </label>
        <input
          className="fe"
          type="text"
          name="currency"
          id="currency"
          placeholder="BTC"
          value={currency}
          onChange={this.handleInputChange}
        />
        <br />

        <label htmlFor="amount">
          Amount:
        </label>
        <input
          className="fe"
          type="number"
          name="amount"
          id="amount"
          placeholder="10"
          value={amount}
          onChange={this.handleInputChange}
        />

        <br />

        <label htmlFor="priceEUR">
          Price in EUR:
        </label>
        <input
          className="fe"
          type="number"
          name="priceEUR"
          id="priceEUR"
          placeholder="10"
          value={priceEUR}
          onChange={this.handleInputChange}
        />
        <br />

        <label htmlFor="priceBTC">
          Price in BTC:
        </label>
        <input
          className="fe"
          type="number"
          name="priceBTC"
          id="priceBTC"
          placeholder="10"
          value={priceBTC}
          onChange={this.handleInputChange}
        />
        <br />

        <button className="fe-btn" type="button" onClick={this.handleTradeAdd}>
          Add Trade
        </button>

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
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...PortfoliosActions,
  ...RatesActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TradesManager));
