import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Item from '../Item';

const ICOListView = (props) => {
  const { icos } = props;

  return (
    <>
      <h2>List of your investments in Initial Coin Offerings</h2>
      { Object.keys(icos).map((ico) => (
        <Item key={icos[ico].name} name={icos[ico].name} />
      ))}
    </>
  );
};

ICOListView.propTypes = {
  icos: PropTypes.shape({}).isRequired,
};

export default ICOListView;
