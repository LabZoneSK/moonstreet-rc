import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  database,
  auth,
  storageKey,
  isAutheticated,
} from '../../firebase';
import * as AppActions from './actions';
import * as WalletsActions from '../Wallets/actions';
import * as RatesActions from '../Rates/actions';
import * as PortfoliosActions from '../Portfolios/actions';
import * as ICOActions from '../ICO/actions';

import Header from '../../components/header';
import Login from '../Login';

import Sidebar from '../Sidebar';

/** Containers */
import Dashboard from '../Dashboard/Dashboard';
import Portfolios from '../Portfolios';
import Wallets from '../Wallets';
import Rates from '../Rates';
import ICOs from '../ICO';
import CoinPotential from '../CoinPotential/CoinPotential';
import Settings from '../Settings/Settings';

import * as cc from '../../cryptocompare';

require('../../styles/style.scss');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: {
        database: true,
        rates: true,
      },
    };
  }

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
      console.log(user);
      this.setState(() => ({
        loading: {
          database: true,
          rates: true,
        },
      }));
      if (user) {
        // eslint-disable-next-line no-undef
        window.localStorage.setItem(storageKey, user.uid);

        loadUserEmail(auth.currentUser.email, user.uid);

        // TODO: Do we really need to load whole user data to user?
        return database.ref(user.uid).once('value').then((snapshot) => {
          // eslint-disable-next-line no-underscore-dangle
          const dbDataRaw = snapshot.node_.val();

          if (dbDataRaw !== null) {
            const { portfolios, wallets, icos } = dbDataRaw.clients.own;
            const { settings } = dbDataRaw;
            const collectedRates = [];

            // load user settings from db
            if (settings === null) {
              // create default settings
              database.ref(user.uid).child('settings').set({
                primaryFiat: 'EUR',
              });

              loadUserSettings({ primaryFiat: 'EUR' });
            } else {
              loadUserSettings(settings);
            }

            // load wallet data into state
            if (wallets !== '') {
              Object.keys(wallets).forEach((element) => {
                const { assets } = wallets[element];
                if (assets !== undefined) {
                  Object.keys(assets).forEach((walletAsset) => {
                    // same thing used on line 113, extract it!
                    if (collectedRates.includes(walletAsset) === false) {
                      collectedRates.push(walletAsset);
                    }
                  });
                }
              });

              setInitialWallets(wallets);
            }

            // load portfolios into state
            if (portfolios !== '') {
              Object.keys(portfolios).forEach((element) => {
                const { trades } = portfolios[element];
                if (trades !== undefined) {
                  Object.keys(trades).forEach((trade) => {
                    if (collectedRates.includes(trades[trade].currency) === false) {
                      collectedRates.push(trades[trade].currency);
                    }
                  });
                }
              });

              setInitialPortfolios(portfolios);
            }

            // fetch all collected rates
            if (collectedRates.length > 0) {
              cc.priceFull(collectedRates, ['BTC', 'USD', 'EUR'])
                .then((prices) => {
                  addInitialRates(prices);
                  this.setState((prevState) => ({
                    loading: {
                      ...prevState.loading,
                      rates: false,
                    },
                  }));
                });
            } else {
              this.setState((prevState) => ({
                loading: {
                  ...prevState.loading,
                  rates: false,
                },
              }));
            }

            if (icos !== '') {
              Object.keys(icos).forEach((element) => {
                addICO(element, icos[element]);
              });
            }
          } else {
            // no data - brand new user
            // load user settings from db
            const userDBRef = database.ref(user.uid);
            userDBRef.set({
              clients: {
                own: {
                  icos: '',
                  wallets: '',
                  portfolios: '',
                },
              },
              settings: {
                primaryFiat: 'EUR',
              },
            }, (error) => {
              if (error) {
                console.log('error writing basic data structure');
              } else {
                console.log('data write ok');
                // eslint-disable-next-line no-undef
                window.location.reload(false);
              }
            });
          }

          this.setState((prevState) => ({
            loading: {
              ...prevState.loading,
              database: false,
            },
          }));
        });
      }

      // eslint-disable-next-line no-undef
      window.localStorage.removeItem(storageKey);
      return null;
    });
  }

  render() {
    const { loading } = this.state;

    function Page() {
      // if user is autenticated they'll see actuall app instead of login window
      if (isAutheticated()) {
        if (!loading.database && !loading.rates) {
          return (
            <div>
              <Header />
              <main className="main">
                <Sidebar />
                <section className="dashboard">
                  <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/portfolios" component={Portfolios} />
                    <Route path="/portfolios/:portfolioID" component={Portfolios} />
                    <Route exact path="/wallets" component={Wallets} />
                    <Route path="/wallets/:walletID" component={Wallets} />
                    <Route exact path="/rates" component={Rates} />
                    <Route exact path="/ico" component={ICOs} />
                    <Route exact path="/coinPotential" component={CoinPotential} />
                    <Route exact path="/settings" component={Settings} />
                  </Switch>
                </section>
              </main>
            </div>
          );
        }
        return (
          <p>Loading data</p>
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
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...AppActions,
  ...PortfoliosActions,
  ...WalletsActions,
  ...RatesActions,
  ...ICOActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
