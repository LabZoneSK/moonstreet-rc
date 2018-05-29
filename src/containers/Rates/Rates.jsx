import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as RatesActions from './actions';

class Rates extends React.Component {

  render() {

    const { rates, ratesHistorical } = this.props; 
    let ratesTable = '';

    if ((rates !== undefined) && (ratesHistorical !== undefined)) {
      ratesTable = rates.toSeq().map((rate, key) => {
        let deltaBTC = Number(100 * (rate.get('BTC') / ratesHistorical.getIn([key, 'BTC'])) - 100).toFixed(2)
        let deltaEUR = Number(100 * (rate.get('EUR') / ratesHistorical.getIn([key, 'EUR'])) - 100).toFixed(2)
        let deltaUSD = Number(100 * (rate.get('USD') / ratesHistorical.getIn([key, 'USD'])) - 100).toFixed(2)
   
        return(
          <tr key={key}>
            <td className="tLeft">{key}</td>
            <td>
              ₿{rate.get('BTC')}
            </td>
            <td>
              <span className={'detlaSpan ' + (deltaBTC < 0 ? 'neg' : 'pos')}>{Number(deltaBTC).toFixed(2)}%</span>
            </td>
            <td>
              €{rate.get('EUR')}
            </td>
            <td>
              <span className={'detlaSpan ' + (deltaEUR < 0 ? 'neg' : 'pos')}>{Number(deltaEUR).toFixed(2)}%</span>
            </td>
            <td>
              ${rate.get('USD')}
            </td>
            <td>
              <span className={'detlaSpan ' + (deltaUSD < 0 ? 'neg' : 'pos')}>{Number(deltaUSD).toFixed(2)}%</span>
            </td>
          </tr>
        )
      }).valueSeq().toArray();;
    } else {
      return (
        <p>no rates loaded or api down</p>
      )
    }

    return (<div>
      <p>This page will display rates of curencies found in you portfolio</p>
      <table className="tRight">
        <thead>
          <tr>
            <th className="tLeft">currency</th>
            <th>BTC</th>
            <th>24h%</th>
            <th>EUR</th>
            <th>24h%</th>
            <th>USD</th>
            <th>24h%</th>
          </tr>
        </thead>
        <tbody>
          {ratesTable}
        </tbody>
      </table>
    </div>
    )
  }
};

Rates.propTypes = {
  addRate: PropTypes.func.isRequired,
};

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...RatesActions,
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Rates));
