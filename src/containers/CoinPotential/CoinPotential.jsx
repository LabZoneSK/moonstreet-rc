import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';



import * as cc from '../../cryptocompare';

const CoinPotential = (props) => {
  const { rates } = props;
  const [coinData, setCoinData] = useState({});

  useEffect(() => {
    if (rates.toSeq().valueSeq().toArray().length > 0) {
      console.log("stuff")
      //cc.priceFull()
    }
  }, [rates]);

  return (
    <div>
      <p> Coin potential here </p>

      {rates && rates.toSeq().valueSeq().toArray().length > 0 && (
        rates.toSeq().map((coinRates, coin) => <p key={coinRates}>{ coin }</p>).valueSeq().toArray()
      )}
    </div>
  );
};

CoinPotential.propTypes = {
  rates: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoinPotential));
