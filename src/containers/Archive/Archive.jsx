import React, { useState, useEffect } from 'react';
import store from '../../redux/store';

const Archive = () => {
  const [query, setQuery] = useState('');
  const trades = store.getState().portfolios;
  const keys = Object.keys(trades);

  useEffect(() => {
    console.log(keys);
  }, []);

  const search = (q) => {
    setQuery(q);
    if (q) {
      console.log('query is not empty');
    }
  };
  return (
    <div className="archive">
      <h1>Archive</h1>
      <h3>filter</h3>
      <input type="text" value={query} onInput={(e) => search(e.target.value)} />
      <p>{query}</p>
      <h2>trades:</h2>
      {keys.map((item, index) => <p>{`${item} ${index}`}</p>)}
    </div>
  );
};

export default Archive;
