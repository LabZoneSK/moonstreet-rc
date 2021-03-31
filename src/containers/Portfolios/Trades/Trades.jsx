/**
 *
 * Wallet
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

import * as PortfoliosActions from '../actions';

class Trades extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(e) {
    const { portfolioKey, removeTrade } = this.props;

    console.log(portfolioKey);

    // eslint-disable-next-line no-undef
    if (window.confirm(`Are you sure you want to remove trade ${e.target.getAttribute('tradekey')}?`)) {
      database.ref(this.props.user.getIn(['uid'])).child(`clients/own/portfolios/${portfolioKey}/trades/${e.target.getAttribute('tradekey')}`).remove();

      removeTrade(portfolioKey, e.target.getAttribute('tradekey'));
    }
  }

  render() {
    const { portfolios, portfolioKey, rates } = this.props;

    const trades = portfolios.getIn([portfolioKey, 'trades']);

    let tradeList = (<tbody><tr><td>no trades</td></tr></tbody>);

    if (trades !== undefined && rates !== undefined) {
      tradeList = trades.entrySeq().map((trade) => {
        const date = trade[1].getIn(['date']);
        const orderType = trade[1].getIn(['orderType']);
        const currency = trade[1].getIn(['currency']);
        const amount = trade[1].getIn(['amount']);
        const priceEUR = trade[1].getIn(['priceEUR']);
        const priceBTC = trade[1].getIn(['priceBTC']);

        const currentEUR = (Number(rates.getIn([currency, 'EUR', 'PRICE'])) * amount).toFixed(2);
        const currentBTC = (Number(rates.getIn([currency, 'BTC', 'PRICE'])) * amount).toFixed(4);

        const roiEUR = Number(((((rates.getIn([currency, 'EUR', 'PRICE'])) * amount) / priceEUR) * 100) - 100).toFixed(2);
        const roiBTC = Number(((((rates.getIn([currency, 'BTC', 'PRICE'])) * amount) / priceBTC) * 100) - 100).toFixed(2);


        let colorClassEUR = '';
        let colorClassBTC = '';

        if (orderType === 'sell') {
          colorClassEUR = roiEUR < 0 ? 'pos' : 'neg';
          colorClassBTC = roiBTC < 0 ? 'pos' : 'neg';
        } else {
          colorClassEUR = roiEUR > 0 ? 'pos' : 'neg';
          colorClassBTC = roiBTC > 0 ? 'pos' : 'neg';
        }


        return (
          <tbody className="tradeTbody" key={trade[0]}>
            <tr>
              <td rowSpan="2">{date}</td>
              <td rowSpan="2">{orderType}</td>
              <td rowSpan="2">{currency}</td>
              <td rowSpan="2">{amount}</td>
              <td>€{priceEUR}</td>
              <td>€{currentEUR} </td>
              <td><span className={`detlaSpan ${colorClassEUR}`}>{roiEUR}%</span></td>
              <td rowSpan="2"><button className="fe-btn" type="remove" tradekey={trade[0]} onClick={this.handleRemove}>x</button></td>
            </tr>
            <tr>
              <td>₿{priceBTC}</td>
              <td>₿{currentBTC}</td>
              <td><span className={`detlaSpan ${colorClassBTC}`}>{roiBTC}%</span></td>
            </tr>
          </tbody>
        );
      }).valueSeq().toArray();
    }

    return (
      <div>
        <h2>Trades</h2>

        <table className="trades">
          <thead>
            <tr>
              <th width="10%">Date</th>
              <th width="10%">Order</th>
              <th width="10%">Currency</th>
              <th width="10%">Amount</th>
              <th width="20%">Cost</th>
              <th width="20%">Current price</th>
              <th width="10%">ROI</th>
              <th width="10%">Actions</th>
            </tr>
          </thead>
          {tradeList}
        </table>
      </div>
    );
  }
}

Trades.propTypes = {
  removeTrade: PropTypes.func.isRequired,
  portfolioKey: PropTypes.string.isRequired,
  user: ImmutablePropTypes.map.isRequired,
  portfolios: ImmutablePropTypes.map.isRequired,
  rates: ImmutablePropTypes.map.isRequired,
};

/* Container part */
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...PortfoliosActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trades));
