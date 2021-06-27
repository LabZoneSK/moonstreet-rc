import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as RatesActions from '../actions';
import * as cc from '../../../cryptocompare';

import styles from './RateRefresh.module.scss';

class RateRefresh extends React.Component {
  constructor(props) {
    super(props);

    this.refreshRates = this.refreshRates.bind(this);
  }

  // TODO: ad timeout for button usage to prevent abusing API

  refreshRates() {
    const {
      rates,
      addInitialRates,
    } = this.props;

    if (rates !== undefined) {
      cc.priceFull(Object.keys(rates), ['BTC', 'USD', 'EUR'])
        .then((prices) => {
          addInitialRates(prices);
        }).catch(console.error);
    }
  }

  render() {
    return (
      <div className={styles.refreshButton}>
        <button className="fe-btn" type="button" onClick={this.refreshRates}>Refresh</button>
      </div>
    );
  }
}

RateRefresh.propTypes = {
  addInitialRates: PropTypes.func.isRequired,
  rates: PropTypes.shape({}).isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...RatesActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RateRefresh));
