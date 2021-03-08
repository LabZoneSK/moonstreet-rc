import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as RatesActions from './actions';

class Rates extends React.Component {

  render() {

    const { rates } = this.props;
    let ratesTable = '';

    if (rates !== undefined) {
      ratesTable = rates.toSeq().map((rate, key) => {
        const deltaBTC = Number(rate.getIn(['BTC', 'CHANGEPCT24HOUR'])).toFixed(2);
        const deltaEUR = Number(rate.getIn(['EUR', 'CHANGEPCT24HOUR'])).toFixed(2);
        const deltaUSD = Number(rate.getIn(['USD', 'CHANGEPCT24HOUR'])).toFixed(2);

        return(
          <tr key={key}>
            <td className="tLeft">{key}</td>
            <td>
              ₿{rate.getIn(['BTC', 'PRICE'])}
            </td>
            <td>
              <span className={'detlaSpan ' + (deltaBTC < 0 ? 'neg' : 'pos')}>{deltaBTC}%</span>
            </td>
            <td>
              €{rate.getIn('EUR', 'PRICE')}
            </td>
            <td>
              <span className={'detlaSpan ' + (deltaEUR < 0 ? 'neg' : 'pos')}>{deltaEUR}%</span>
            </td>
            <td>
              ${rate.getIn('USD', 'PRICE')}
            </td>
            <td>
              <span className={'detlaSpan ' + (deltaUSD < 0 ? 'neg' : 'pos')}>{deltaUSD}%</span>
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
