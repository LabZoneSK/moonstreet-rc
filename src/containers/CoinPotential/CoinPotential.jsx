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

  const corectedSupply = (coinRates, coin) => {
    // hardcoded fixes for some of the coins cause CC API doesn't return correct stuff
    if (coin === 'ENJ') {
      return 834313757;
    }
    return Number(coinRates.getIn(['USD', 'MKTCAP'])).toFixed(2);
  };

  return (
    <div>
      <p>Coin potential here </p>
      <p>
        Note: Potential is calculated agains BTC market cappacity in USD @ $
        {btcCAP}
      </p>
      <p>max USD: value of a single coin with same market capitalisation as Bitcoin</p>
      <p>current strength: how close a coin is to its max USD</p>
      <br />

      {rates && rates.toSeq().valueSeq().toArray().length > 0 && (
        rates.toSeq().map((coinRates, coin) => {
          const usdPotential = Number(btcCAP / (corectedSupply(coinRates, coin) / coinRates.getIn(['USD', 'PRICE']))).toFixed(2);
          const currentStrength = Number((coinRates.getIn(['USD', 'PRICE']) / (usdPotential / 100))).toFixed(2);

          return (
            <p key={coinRates}>
              <strong>
                { coin }
              </strong>
              <span> max USD @ </span>
              <strong>
                $
                { usdPotential }
              </strong>
              <span> , current strength @ </span>
              <strong>
                { currentStrength }
                %
              </strong>
              <span>
                <span> calculated against supply of </span>
                {corectedSupply(coinRates, coin)}
              </span>
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

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoinPotential));
