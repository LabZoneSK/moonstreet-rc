import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

const GetValue = (props) => {
  const {
    rates,
    assetKey,
    assetRate,
    assetVolume,
  } = props;
  const delta = rates.getIn([assetKey, assetRate, 'CHANGEPCT24HOUR']);
  const value = rates.getIn([assetKey, assetRate, 'PRICE']) * assetVolume;

  return (
    <div>
      { assetRate === 'BTC' ? '₿' : ''}
      { assetRate === 'EUR' ? '€' : ''}
      { assetRate === 'USD' ? '$' : ''}
      {Number(value).toFixed(4)}
      <span className={`detlaSpan ${delta < 0 ? 'neg' : 'pos'}`}>{Number(delta).toFixed(2)}%</span>
    </div>
  );
};

GetValue.propTypes = {
  rates: ImmutablePropTypes.map.isRequired,
  assetRate: PropTypes.string.isRequired,
  assetKey: PropTypes.string.isRequired,
  assetVolume: PropTypes.number.isRequired,
};

/* Container part */
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetValue));
