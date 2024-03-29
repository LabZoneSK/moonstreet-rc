import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { roundNumber } from '../../../utils/Math';

const GetValue = (props) => {
  const {
    rates,
    assetKey,
    assetRate,
    assetVolume,
  } = props;
  const delta = (rates[assetKey] && rates[assetKey][assetRate].CHANGEPCT24HOUR) || 0;
  const value = (rates[assetKey] && rates[assetKey][assetRate].PRICE * assetVolume) || 0;

  return (
    <div>
      { assetRate === 'BTC' ? '₿' : ''}
      { assetRate === 'EUR' ? '€' : ''}
      { assetRate === 'USD' ? '$' : ''}
      {roundNumber(value, assetRate === 'BTC' ? 4 : 2)}
      <span className={`detlaSpan ${delta < 0 ? 'neg' : 'pos'}`}>
        {Number(delta).toFixed(2)}
        %
      </span>
    </div>
  );
};

GetValue.propTypes = {
  rates: PropTypes.shape({}).isRequired,
  assetRate: PropTypes.string.isRequired,
  assetKey: PropTypes.string.isRequired,
  assetVolume: PropTypes.number.isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetValue));
