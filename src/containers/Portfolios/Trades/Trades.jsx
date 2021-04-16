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
import cx from 'classnames';
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
        let roiEUR = 0;
        let roiBTC = 0;

        const currentEUR = (Number(rates.getIn([currency, 'EUR', 'PRICE'])) * amount).toFixed(2);
        const currentBTC = (Number(rates.getIn([currency, 'BTC', 'PRICE'])) * amount).toFixed(4);

        if (priceEUR > 0) {
          roiEUR = Number(((((rates.getIn([currency, 'EUR', 'PRICE'])) * amount) / priceEUR) * 100) - 100).toFixed(2);
        }

        if (priceBTC > 0) {
          roiBTC = Number(((((rates.getIn([currency, 'BTC', 'PRICE'])) * amount) / priceBTC) * 100) - 100).toFixed(2);
        }

        return (
          <tbody className="tradeTbody" key={trade[0]}>
            <tr>
              <td rowSpan="2">{date}</td>
              <td rowSpan="2">{orderType}</td>
              <td rowSpan="2">{currency}</td>
              <td rowSpan="2">{amount}</td>
              <td>
                {priceEUR === 0 ? '--' : `€${priceEUR}`}
              </td>
              <td>
                {currentEUR === 0 ? '--' : `€${currentEUR}`}
              </td>
              <td>
                <span
                  className={cx({
                    detlaSpan: true,
                    pos: (orderType === 'sell' && roiEUR < 0) || (orderType === 'buy' && roiEUR > 0),
                    neg: (orderType === 'sell' && roiEUR > 0) || (orderType === 'buy' && roiEUR < 0),
                  })}
                >
                  {roiEUR === 0 ? '--' : `${roiEUR}%`}
                </span>
              </td>
              <td rowSpan="2"><button className="fe-btn" type="remove" tradekey={trade[0]} onClick={this.handleRemove}>x</button></td>
            </tr>
            <tr>
              <td>
                {priceBTC === 0 ? '--' : `₿${priceBTC}`}
              </td>
              <td>
                {currentBTC === 0 ? '--' : `₿${currentBTC}`}
              </td>
              <td>
                <span
                  className={cx({
                    detlaSpan: true,
                    pos: (orderType === 'sell' && roiBTC < 0) || (orderType === 'buy' && roiBTC > 0),
                    neg: (orderType === 'sell' && roiBTC > 0) || (orderType === 'buy' && roiBTC < 0),
                  })}
                >
                  {roiBTC === 0 ? '--' : `${roiBTC}%`}
                </span>
              </td>
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
