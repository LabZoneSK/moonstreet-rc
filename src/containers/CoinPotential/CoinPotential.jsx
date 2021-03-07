import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import * as CoinPotentialActions from './actions';

const CoinPotential = (props) => {
  const { rates } = props;

  useEffect(() => {
    console.log('component mounted: ', rates.toSeq().valueSeq().toArray());
  }, [rates]);

  return (
    <div>
      <p> Coin potential here </p>

      {rates && rates.toSeq().valueSeq().toArray().length > 0 && (
        rates.toSeq().map((rates, coin) => <p key={rates}>{ coin }</p>).valueSeq().toArray()
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

const mapDispatchToProps = dispatch => bindActionCreators({
  ...CoinPotentialActions,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoinPotential));
