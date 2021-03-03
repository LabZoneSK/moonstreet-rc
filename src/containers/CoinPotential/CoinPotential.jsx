import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CoinPotential = (props) => {

  const [coinList, setCoinList] = useState({});

  useEffect(() => {
    console.log('component mounted');
  },[])

  return (
    <p> Coin potential here </p>
  );

};

CoinPotential.propTypes = {
};

    
export default CoinPotential;
