import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ name }) => (
  <div className="icom-item">
    <div>{name}</div>
    <div>17 000 CAPP</div>
  </div>
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
};


export default Item;
