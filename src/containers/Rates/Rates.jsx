import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as RatesActions from './actions';
import { roundNumber } from '../../utils/Math';

const Rates = (props) => {
  const { rates } = props;
  let ratesTable = '';

  if (rates !== undefined) {
    ratesTable = Object.keys(rates).map((assetKey) => {
      const deltaBTC = Number(rates[assetKey].BTC.CHANGEPCT24HOUR).toFixed(2);
      const deltaEUR = Number(rates[assetKey].EUR.CHANGEPCT24HOUR).toFixed(2);
      const deltaUSD = Number(rates[assetKey].USD.CHANGEPCT24HOUR).toFixed(2);

      return (
        // eslint-disable-next-line react/no-array-index-key
        <tr key={assetKey}>
          <td className="tLeft">{assetKey}</td>
          <td>
            ₿
            {roundNumber(rates[assetKey].BTC.PRICE, 8)}
            <br />
            <span className={`detlaSpan ${deltaBTC < 0 ? 'neg' : 'pos'}`}>
              {deltaBTC}
              %
            </span>
          </td>
          <td>
            €
            {roundNumber(rates[assetKey].EUR.PRICE, 3)}
            <br />
            <span className={`detlaSpan ${deltaEUR < 0 ? 'neg' : 'pos'}`}>
              {deltaEUR}
              %
            </span>
          </td>
          <td>
            $
            {roundNumber(rates[assetKey].USD.PRICE, 3)}
            <br />
            <span className={`detlaSpan ${deltaUSD < 0 ? 'neg' : 'pos'}`}>
              {deltaUSD}
              %
            </span>
          </td>
        </tr>
      );
    });
  } else {
    return (
      <p>no rates loaded or api down</p>
    );
  }

  return (
    <div>
      <p>This page will display rates of curencies found in you portfolio</p>
      <table className="tRight">
        <thead>
          <tr>
            <th className="tLeft">currency</th>
            <th>BTC</th>
            <th>EUR</th>
            <th>USD</th>
          </tr>
        </thead>
        <tbody>
          {ratesTable}
        </tbody>
      </table>
    </div>
  );
};

Rates.propTypes = {
  rates: PropTypes.shape({}).isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...RatesActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Rates));
