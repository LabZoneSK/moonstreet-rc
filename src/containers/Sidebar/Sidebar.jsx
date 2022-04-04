import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { auth } from '../../firebase';

import SubMenu from '../../components/Submenu';
import Footer from '../../components/footer';

const getLinks = (settings, parentPath) => (
  Object.keys(settings).map((w) => {
    const dynamicPath = parentPath + settings[w].name;
    return { path: dynamicPath, name: settings[w].name };
  })
);

const logout = () => {
  localStorage.clear();
  auth.signOut().then(() => {
    // Sign-out successful.
  }).catch(() => {
    // An error happened.
  });
};

const Sidebar = (props) => {
  const { location, wallets, portfolios } = props;

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
          <li>
            <NavLink activeClassName="active" to="/portfolios">Portfolios</NavLink>
            {portfolios !== undefined
              && <SubMenu group="portfolios" links={getLinks(portfolios, '/portfolios/')} active="active" visible={location.pathname.includes('portfolio')} />}
          </li>

          <li>
            <NavLink activeClassName="active" to="/wallets">Wallets</NavLink>
            {wallets !== undefined
              && <SubMenu group="wallets" links={getLinks(wallets, '/wallets/')} active="active" visible={location.pathname.includes('wallet')} />}
          </li>
          <li><NavLink exact activeClassName="active" to="/rates">Rates</NavLink></li>
          <li><NavLink exact activeClassName="active" to="/ico">ICO</NavLink></li>
          <li>
            <NavLink exact activeClassName="active" to="/coinPotential">
              Coin potential
            </NavLink>
          </li>
          <li><NavLink exact activeClassName="active" to="/settings">Settings</NavLink></li>
          <li>
            <NavLink onClick={logout} exact activeClassName="white" to="/">Logout</NavLink>
          </li>
        </ul>
      </nav>
      <Footer />
    </aside>
  );
};

Sidebar.propTypes = {
  wallets: PropTypes.shape({}).isRequired,
  portfolios: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
