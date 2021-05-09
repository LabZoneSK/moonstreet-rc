import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

const GetTotal = (props) => {
  const { rates, assets, assetRate } = props;

  let sum = 0;
  let deltaHisto = 0;

  // TODO: this is really shitty piece of code
  assets.toSeq().forEach((amount, symbol) => {
    sum += (Number(rates.getIn([symbol, assetRate, 'PRICE'])) * amount);
    deltaHisto += Number(rates.getIn([symbol, assetRate, 'CHANGEPCT24HOUR']));
  });

  const delta = deltaHisto / assets.toArray().length;

  return (
    <div>
      { assetRate === 'BTC' ? '₿' : ''}
      { assetRate === 'EUR' ? '€' : ''}
      { assetRate === 'USD' ? '$' : ''}
      {Number(sum).toFixed(4)}
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
