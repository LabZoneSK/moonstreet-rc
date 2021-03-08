import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { database, auth, storageKey, isAutheticated } from '../../firebase';
import * as AppActions from './actions';
import * as WalletsActions from '../Wallets/actions';
import * as RatesActions from '../Rates/actions';
import * as PortfoliosActions from '../Portfolios/actions';
import * as ICOActions from '../ICO/actions';

import Header from '../../components/header';
import Login from '../../containers/Login/';

import Sidebar from '../../containers/Sidebar';

/** Containers */
import Home from '../../templates/Home';
import Portfolios from '../../containers/Portfolios';
import Wallets from '../../containers/Wallets';
import Rates from '../../containers/Rates';
import ICOs from '../../containers/ICO';
import CoinPotential from '../../containers/CoinPotential/CoinPotential';

import * as cc from '../../cryptocompare';

require('../../styles/style.css');

class App extends React.Component {
  componentDidMount() {
    const {
      loadUserEmail,
      loadUserSettings,
      setInitialWallets,
      setInitialPortfolios,
      addInitialRates,
      addICO,
    } = this.props;

    auth.onAuthStateChanged((user) => {
      if (user) {
        // eslint-disable-next-line no-undef
        window.localStorage.setItem(storageKey, user.uid);

        loadUserEmail(auth.currentUser.email, user.uid);

        // TODO: Do we really need to load whole user data to user?
        return database.ref(user.uid).once('value').then((snapshot) => {
          // eslint-disable-next-line no-underscore-dangle
          const dbData = fromJS(snapshot.node_.val());

          // load user settings from db
          if (dbData.getIn(['settings']) === undefined || dbData.getIn(['settings']) === '') {
            console.log('no settings.');
            // create default settings
            database.ref(user.uid).child('settings').set({
              primaryFiat: 'EUR',
            });

            loadUserSettings(fromJS({ primaryFiat: 'EUR' }));
          } else {
            loadUserSettings(dbData.getIn(['settings']));
          }

          if (dbData !== null || dbData !== '') {
            const wallets = dbData.getIn(['clients', 'own', 'wallets']);
            const portfolios = dbData.getIn(['clients', 'own', 'portfolios']);
            const icos = dbData.getIn(['clients', 'own', 'icos']);
            const walletObject = {};
            const porfoliosObject = {};
            const collectedRates = [];

            // load wallet data into state
            if (wallets !== undefined) {
              wallets.entrySeq().forEach((element) => {
                walletObject[element[0]] = {
                  name: element[1].getIn(['name']),
                  assets: element[1].getIn(['assets']),
                };

                const assets = element[1].getIn(['assets']);
                if (assets !== undefined) {
                  assets.entrySeq().forEach((walletAsset) => {
                    // same thing used on line 113, extract it!
                    if (collectedRates.includes(walletAsset[0]) === false) {
                      collectedRates.push(walletAsset[0]);
                    }
                  });
                }
              });

              setInitialWallets(walletObject);
            }

            // load portfolios into state
            if (portfolios !== undefined) {
              portfolios.entrySeq().forEach((element) => {
                porfoliosObject[element[0]] = {
                  name: element[1].getIn(['name']),
                  initial: element[1].getIn(['initial']),
                  trades: element[1].getIn(['trades']),
                };

                const trades = element[1].getIn(['trades']);
                if (trades !== undefined) {
                  trades.entrySeq().forEach((trade) => {
                    if (collectedRates.includes(trade[1].getIn(['currency'])) === false) {
                      collectedRates.push(trade[1].getIn(['currency']));
                    }
                  });
                }
              });

              setInitialPortfolios(porfoliosObject);
            }

            // fetch all collected rates
            cc.priceFull(collectedRates, ['BTC', 'USD', 'EUR'])
              .then((prices) => {
                addInitialRates(prices);
              }).catch(console.error);

            if (icos !== undefined) {
              icos.entrySeq().forEach((element) => {
                addICO(element[0], element[1]);
              });
            }
          } else {
            console.log('no data.');
          }
        });
      }

      // eslint-disable-next-line no-undef
      window.localStorage.removeItem(storageKey);
      return null;
    });
  }

  render() {
    function Page() {
      // if user is autenticated they'll see actuall app instead of login window
      if (isAutheticated()) {
        return (
          <div>
            <Header />
            <main className="main">
              <Sidebar />
              <section className="dashboard">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/portfolios" component={Portfolios} />
                  <Route path="/portfolios/:portfolioID" component={Portfolios} />
                  <Route exact path="/wallets" component={Wallets} />
                  <Route path="/wallets/:walletID" component={Wallets} />
                  <Route exact path="/rates" component={Rates} />
                  <Route exact path="/ico" component={ICOs} />
                  <Route exact path="/coinPotential" component={CoinPotential} />
                </Switch>
              </section>
            </main>
          </div>
        );
      }

      return (
        <Login />
      );
    }

    return (
      <div>
        <Page />
      </div>
    );
  }
}

App.propTypes = {
  loadUserEmail: PropTypes.func.isRequired,
  loadUserSettings: PropTypes.func.isRequired,
  addICO: PropTypes.func.isRequired,
  setInitialWallets: PropTypes.func.isRequired,
  setInitialPortfolios: PropTypes.func.isRequired,
  addInitialRates: PropTypes.func.isRequired,
};

// container part
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...AppActions,
  ...PortfoliosActions,
  ...WalletsActions,
  ...RatesActions,
  ...ICOActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
