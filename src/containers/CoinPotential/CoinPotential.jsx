import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

const CoinPotential = (props) => {
  const { rates } = props;
  const [btcCAP, setBtcCAP] = useState(0);

  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      setBtcCAP(rates.BTC.USD.MKTCAP);
    }
  }, [rates]);

  const corectedSupply = (coinRates, coin) => {
    // hardcoded fixes for some of the coins cause CC API doesn't return correct stuff
    if (coin === 'ENJ') {
      return 834313757;
    }
    return Number(coinRates.USD.MKTCAP).toFixed(2);
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

      {rates && Object.keys(rates).length > 0 && (
        Object.keys(rates).map((assetKey) => {
          const usdPotential = Number(btcCAP / (corectedSupply(rates[assetKey], assetKey) / rates[assetKey].USD.PRICE)).toFixed(2);
          const currentStrength = Number((rates[assetKey].USD.PRICE / (usdPotential / 100))).toFixed(2);

          return (
            <p key={rates[assetKey].USD.PRICE}>
              <strong>
                { assetKey }
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
                {corectedSupply(rates[assetKey], assetKey)}
              </span>
            </p>
          );
        })
      )}
    </div>
  );
};

CoinPotential.propTypes = {
  rates: PropTypes.shape({
    BTC: PropTypes.shape({
      USD: PropTypes.shape({
        MKTCAP: PropTypes.string,
      }),
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoinPotential));
