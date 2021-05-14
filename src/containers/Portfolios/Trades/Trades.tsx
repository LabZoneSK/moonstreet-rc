/**
 *
 * Wallet
 *
 * Write description
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cx from 'classnames';
import { database } from '../../../firebase';

import * as PortfoliosActions from '../actions';

interface TradesPropTypes extends RouteComponentProps {
  removeTrade: any,
  portfolioKey: string,
  user: any,
  portfolios: any,
  rates: any,
}

type TradeTypes = TradesPropTypes;

class Trades extends React.Component<TradeTypes> {
  constructor(props: TradeTypes) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(tradekey: string) {
    const { portfolioKey, removeTrade, user } = this.props;

    console.log(portfolioKey);

    // eslint-disable-next-line no-undef
    if (window.confirm('Are you sure you want to remove trade tradekey?')) {
      database.ref(user.uid).child(`clients/own/portfolios/${portfolioKey}/trades/${tradekey}`).remove();

      removeTrade(portfolioKey, tradekey);
    }
  }

  render() {
    const { portfolios, portfolioKey, rates } = this.props;

    const { trades } = portfolios[portfolioKey];

    let tradeList = null;

    if (trades !== undefined && rates !== undefined) {
      tradeList = Object.keys(trades).map((trade: string) => {
        const {
          date,
          orderType,
          currency,
          amount,
          priceEUR,
          priceBTC,
        } = trades[trade];
        let roiEUR = 0;
        let roiBTC = 0;
        let currentEUR = 0;
        let currentBTC = 0;

        if (rates[currency]) {
          currentEUR = Number((Number(rates[currency].EUR.PRICE) * amount).toFixed(2));
          currentBTC = Number((Number(rates[currency].BTC.PRICE) * amount).toFixed(4));

          if (priceEUR > 0) {
            roiEUR = Number(Number((((Number(rates[currency].EUR.PRICE) * Number(amount)) / Number(priceEUR)) * 100) - 100).toFixed(2));
          }

          if (priceBTC > 0) {
            roiBTC = Number(Number((((Number(rates[currency].BTC.PRICE) * Number(amount)) / Number(priceBTC)) * 100) - 100).toFixed(2));
          }
        }

        return (
          <tbody className="tradeTbody" key={trade[0]}>
            <tr>
              <td rowSpan={2}>{date}</td>
              <td rowSpan={2}>{orderType}</td>
              <td rowSpan={2}>{currency}</td>
              <td rowSpan={2}>{amount}</td>
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
              <td rowSpan={2}><button className="fe-btn" type="button" onClick={() => this.handleRemove(trade)}>x</button></td>
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
      });
    }

    return (
      <div>
        <h2>Trades</h2>

        <table className="trades">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Cost</th>
              <th>Current price</th>
              <th>ROI</th>
              <th>Actions</th>
            </tr>
          </thead>
          {tradeList === null ? (
            <tbody><tr><td>no trades</td></tr></tbody>
          ) : (
            tradeList
          )}
        </table>
      </div>
    );
  }
}

/* Container part */
const mapStateToProps = (state: any) => ({
  ...state,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  ...PortfoliosActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trades));
