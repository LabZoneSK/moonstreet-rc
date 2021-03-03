import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import SubMenu from '../../components/Submenu';
import Footer from '../../components/footer';
import RefreshButton from '../Rates/RateRefresh';

const getLinks = (settings, parentPath) => {
  return settings.valueSeq().map((w) => {
    const dynamicPath = parentPath + w.getIn(['name']);
    return { path: dynamicPath, name: w.getIn(['name']) };
  });
};

class Sidebar extends React.Component {

  render() {
    const { location, wallets, portfolios } = this.props;

    return (
      <aside className="sidebar">
        <nav>
          <ul>
            <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
            <li>
              <NavLink activeClassName="active" to="/portfolios">Portfolios</NavLink>
              {portfolios !== undefined &&
                <SubMenu group="portfolios" links={getLinks(portfolios, '/portfolios/')} active="active" visible={location.pathname.includes('portfolio')} />
              }
            </li>
            
            <li>
              <NavLink activeClassName="active" to="/wallets">Wallets</NavLink>
              {wallets !== undefined &&
                <SubMenu group="wallets" links={getLinks(wallets, '/wallets/')} active="active" visible={location.pathname.includes('wallet')} />
              }
            </li>
            <li><NavLink exact activeClassName="active" to="/rates">Rates</NavLink></li>
            <li><NavLink exact activeClassName="active" to="/ico">ICO</NavLink></li>
            <li><NavLink exact activeClassName="active" to="/coinPotential">Coin potential</NavLink></li>
            <li><RefreshButton /></li>
          </ul>
        </nav>
        <Footer />
      </aside>
    );
  }
};

Sidebar.propTypes = {
  wallets: ImmutablePropTypes.map.isRequired,
  portfolios: ImmutablePropTypes.map.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
