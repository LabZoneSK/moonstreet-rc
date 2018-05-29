/**
 *
 * Wallets
 *
 * Write description
 */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PortfoliosManager from './PortfoliosManager';

import Portfolio from './Portfolio'



class Portfolios extends React.Component {


  render() {
    const { portfolioID } = this.props.match.params;

    return (
      <div>
        {portfolioID == undefined &&
          <div>
            <PortfoliosManager />
            <p>Portfolios summary here</p>
          </div>
        }
        {portfolioID != undefined &&
          <div>
            <Portfolio />
          </div>
        }
      </div>
    )

  }
}

Portfolios.propTypes = {
  portfolios: ImmutablePropTypes.map.isRequired,
};

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolios));
