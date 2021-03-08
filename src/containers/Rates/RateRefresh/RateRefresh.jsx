import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as RatesActions from '../actions';
import * as cc from '../../../cryptocompare';

class RateRefresh extends React.Component {

  constructor(props) {
      super(props);

      this.refreshRates = this.refreshRates.bind(this);
  }


  //TODO: ad timeout for button usage to prevent abusing API

  refreshRates() {
    const { rates, addInitialRates } = this.props;

    if (rates !== undefined) {
      cc.priceFull(rates.keySeq().toArray(), ['BTC', 'USD', 'EUR'])
        .then(prices => {
          addInitialRates(prices);
        }).catch(console.error)
    }
  }

  render() {

    return (
      <div>
        <button className="fe-btn" onClick={this.refreshRates}>Refresh</button>
      </div>
    )
  }
};

RateRefresh.propTypes = {
  addInitialRates: PropTypes.func.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RateRefresh));
