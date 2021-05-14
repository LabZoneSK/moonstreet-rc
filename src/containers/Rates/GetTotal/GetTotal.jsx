import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { roundNumber } from '../../../utils/Math';

const GetTotal = (props) => {
  const { rates, assets, assetRate } = props;

  let sum = 0;
  let deltaHisto = 0;

  Object.keys(assets).forEach((assetKey) => {
    if (rates[assetKey]) {
      sum += (Number(rates[assetKey][assetRate].PRICE) * assets[assetKey]);
      deltaHisto += Number(rates[assetKey][assetRate].CHANGEPCT24HOUR);
    }
  });

  const delta = deltaHisto / Object.keys(assets).length;

  return (
    <div>
      { assetRate === 'BTC' ? '₿' : ''}
      { assetRate === 'EUR' ? '€' : ''}
      { assetRate === 'USD' ? '$' : ''}
      {roundNumber(sum, assetRate === 'BTC' ? 4 : 2)}
      <span className={`detlaSpan ${delta < 0 ? 'neg' : 'pos'}`}>
        {Number(delta).toFixed(2)}
        %
      </span>
    </div>
  );
};

GetTotal.propTypes = {
  rates: ImmutablePropTypes.map.isRequired,
  assets: ImmutablePropTypes.map.isRequired,
  assetRate: PropTypes.string.isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // ...RatesActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetTotal));
