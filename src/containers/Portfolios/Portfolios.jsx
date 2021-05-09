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
import PropTypes from 'prop-types';

import PortfoliosManager from './PortfoliosManager';

import Portfolio from './Portfolio';

const Portfolios = (props) => {
  const { match } = props;
  const { portfolioID } = match.params;

  return (
    <div>
      {portfolioID === undefined
        && (
          <div>
            <PortfoliosManager />
            <p>Portfolios summary here</p>
          </div>
        )}
      {portfolioID !== undefined
      && (
        <div>
          <Portfolio />
        </div>
      )}
    </div>
  );
};

Portfolios.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      portfolioID: PropTypes.string,
    }),
  }).isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolios));
