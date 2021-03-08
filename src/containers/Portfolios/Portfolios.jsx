/**
 *
 * Wallets
 *
 * Write description
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PortfoliosManager from './PortfoliosManager';

import Portfolio from './Portfolio';


const Portfolios = (props) => {
  // eslint-disable-next-line react/prop-types
  const { portfolioID } = props.match.params;

  return (
    <div>
      {portfolioID === undefined &&
        <div>
          <PortfoliosManager />
          <p>Portfolios summary here</p>
        </div>
      }
      {portfolioID !== undefined &&
        <div>
          <Portfolio />
        </div>
      }
    </div>
  );
};


/* Container part */
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolios));
