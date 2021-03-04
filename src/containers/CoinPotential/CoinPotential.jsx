import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CoinPotential = (props) => {
  const { context } = props;
  const [coinList, setCoinList] = useState({});

  useEffect(() => {
    console.log('component mounted');
  },[])

  return (
    <div>
      <p> Coin potential here </p>
      <button
        onClick={() => context.state.setTestValue({ value: 'setting some value from child component'})}
      >
        Click me
      </button>
    </div>
  );

};

CoinPotential.propTypes = {
};


export default CoinPotential;
