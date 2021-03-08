import React, { Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Item from '../Item';

const ICOListView = (props) => {
  const { icos } = props;

  return (
    <Fragment>
      <h2>List of your investments in Initial Coin Offerings</h2>
      { icos.map(ico => (
        <Item key={ico.getIn(['name'])} name={ico.getIn(['name'])} />
      )).valueSeq().toArray()}

      {/* {icos != undefined && icos.entrySeq().forEach(ico => {
          // console.log(ico[0], ico[1].getIn(['name']))
          <Item key={ico[0]} name={ico[1].getIn(['name'])} />
        })
      } */}
    </Fragment>
  );
};

ICOListView.propTypes = {
  icos: ImmutablePropTypes.map.isRequired,
};

export default ICOListView;
