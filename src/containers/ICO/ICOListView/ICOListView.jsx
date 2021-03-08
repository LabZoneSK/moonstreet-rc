import React, { Fragment } from 'react';

import Item from '../Item';

class ICOListView extends React.Component {

  render() {

    const icos = this.props.icos;

    return(
      <Fragment>
        <h2>List of your investments in Initial Coin Offerings</h2>
        { icos.map((ico, key) => (
          <Item key={key} name={ico.getIn(['name'])} />
        )).valueSeq().toArray()}

        {/* {icos != undefined && icos.entrySeq().forEach(ico => {
            // console.log(ico[0], ico[1].getIn(['name']))
            <Item key={ico[0]} name={ico[1].getIn(['name'])} />
          })
        } */}
      </Fragment>
    )
  }
}

export default ICOListView;
