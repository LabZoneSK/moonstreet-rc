/**
 *
 * Wallet
 *
 * Write description
 */

import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cx from 'classnames';
import { database } from '../../../firebase';

import * as PortfoliosActions from '../actions';

import styles from './Trades.module.scss';

interface TradesPropTypes extends RouteComponentProps {
  removeTrade: (portfolioKey: string, tradeKey: string) => void,
  portfolioKey: string,
  user: any,
  portfolios: any,
  rates: any,
}

interface ITrades {
  key: string,
  amount: string,
  currency: string,
  date: string,
  orderType: string,
  priceBTC: string,
  priceEUR: string,
}

const Trades: React.FC<TradesPropTypes> = (props: TradesPropTypes) => {
  const {
    portfolios,
    portfolioKey,
    rates,
    removeTrade,
    user,
  } = props;

  const { trades } = portfolios[portfolioKey];

  const [tradesList, setTradesList] = useState<ITrades[]>([]);
  const [tradeType, setTradeType] = useState<string>('buy');

  const handleRemove = (tradekey: string) => {
    // eslint-disable-next-line no-undef
    if (window.confirm(`Are you sure you want to remove trade ${tradekey}?`)) {
      database.ref(user.uid).child(`clients/own/portfolios/${portfolioKey}/trades/${tradekey}`).remove();
      removeTrade(portfolioKey, tradekey);
    }
  };

  useEffect(() => {
    // let's create array of trades to display with calculated stuff
    interface AssetTable {
      [key: string]: String[]
    }
    const assetTable: AssetTable = {};

    if (trades !== undefined) {
      Object.keys(trades).forEach((trade: string) => {
        const { currency } = trades[trade];
        if (assetTable[trades[trade].currency] === undefined) {
          assetTable[currency] = [];
          assetTable[currency].push(trade);
        } else {
          assetTable[currency].push(trade);
        }
      });
    }
  }, []);

  useEffect(() => {
    const filteredTrades:ITrades[] = [];
    Object.keys(trades).forEach((trade) => {
      if (trades[trade].orderType === tradeType) {
        const singleTrade = {
          key: trade,
          ...trades[trade],
        };
        filteredTrades.push(singleTrade);
      }
    });
    setTradesList(filteredTrades);
  }, [tradeType]);

  useEffect(() => {
    console.log('trades: ', tradesList);
    console.log(tradeType);
  }, [tradesList]);

  return (
    <>
      <div>
        <h2>Trades</h2>
        <div className={styles.tabs}>
          <button
            type="button"
            onClick={() => { setTradeType('buy'); }}
            className={cx({
              [styles.active]: tradeType === 'buy',
            })}
          >
            Long
          </button>
          &nbsp;|&nbsp;
          <button
            type="button"
            onClick={() => { setTradeType('sell'); }}
            className={cx({
              [styles.active]: tradeType === 'sell',
            })}
          >
            Short
          </button>
        </div>
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
          {trades === undefined ? (
            <tbody><tr><td>no trades</td></tr></tbody>
          ) : (
            <>
              {tradesList.map((trade: ITrades) => {
                console.log('trade: ', trade);
                const {
                  date,
                  orderType,
                  currency,
                  amount,
                  priceEUR,
                  priceBTC,
                  key,
                } = trade;
                let roiEUR = 0;
                let roiBTC = 0;
                let currentEUR = 0;
                let currentBTC = 0;

                if (rates[currency]) {
                  currentEUR = Number((Number(rates[currency].EUR.PRICE) * Number(amount)).toFixed(2));
                  currentBTC = Number((Number(rates[currency].BTC.PRICE) * Number(amount)).toFixed(4));

                  if (Number(priceEUR) > 0) {
                    roiEUR = Number(Number((((Number(rates[currency].EUR.PRICE) * Number(amount)) / Number(priceEUR)) * 100) - 100).toFixed(2));
                  }

                  if (Number(priceBTC) > 0) {
                    roiBTC = Number(Number((((Number(rates[currency].BTC.PRICE) * Number(amount)) / Number(priceBTC)) * 100) - 100).toFixed(2));
                  }
                }

                return (
                  <tbody className="tradeTbody" key={key}>
                    <tr>
                      <td rowSpan={2}>{date}</td>
                      <td rowSpan={2}>{orderType}</td>
                      <td rowSpan={2}>{currency}</td>
                      <td rowSpan={2}>{amount}</td>
                      <td>
                        {Number(priceEUR) === 0 ? '--' : `€${priceEUR}`}
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
                      <td rowSpan={2}><button className="fe-btn" type="button" onClick={() => handleRemove(key)}>x</button></td>
                    </tr>
                    <tr>
                      <td>
                        {Number(priceBTC) === 0 ? '--' : `₿${priceBTC}`}
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
              })}
            </>
          )}
        </table>
      </div>
    </>
  );
};

/* Container part */
const mapStateToProps = (state: any) => ({
  ...state,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  ...PortfoliosActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trades));
