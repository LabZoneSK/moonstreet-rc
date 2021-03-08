import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CoinPotential = (props) => {
  const { rates } = props;
  const [btcCAP, setBtcCAP] = useState(0);

  useEffect(() => {
    if (rates.toSeq().valueSeq().toArray().length > 0) {
      setBtcCAP(rates.getIn(['BTC', 'USD', 'MKTCAP']));
    }
  }, [rates]);

  return (
    <div>
      <p>Coin potential here </p>
      <p>Note: Potential is calculated agains BTC market cappacity in USD @ ${btcCAP}</p>

      {rates && rates.toSeq().valueSeq().toArray().length > 0 && (
        rates.toSeq().map((coinRates, coin) => {
          let usdPotential = 0;

          // hardcoded fixes for some of the coins cause CC API doesn't return correct stuff
          if (coin === 'ENJ') {
            usdPotential = Number(btcCAP / 834313757).toFixed(2);
          } else {
            usdPotential = Number(btcCAP / (coinRates.getIn(['USD', 'MKTCAP']) / coinRates.getIn(['USD', 'PRICE']))).toFixed(2);
          }

          const currentStrength = (coinRates.getIn(['USD', 'PRICE']) / (usdPotential / 100));

          return (
            <p key={coinRates}>
              { coin } max USD @ ${ usdPotential }, current strenght @ { currentStrength }%
            </p>
          );
        }).valueSeq().toArray()
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
