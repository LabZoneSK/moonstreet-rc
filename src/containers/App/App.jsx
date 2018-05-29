import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { database, auth, storageKey, isAutheticated } from '../../firebase';
import * as AppActions from './actions';
import * as WalletsActions from '../Wallets/actions';
import * as RatesActions from '../Rates/actions';
import * as RatesHistoricalActions from '../RatesHistorical/actions';
import moment from 'moment';
import * as PortfoliosActions from '../Portfolios/actions';
import * as ICOActions from '../ICO/actions';
import Header from '../../components/header';
import Main from '../../components/main';
import Login from '../../containers/Login/';

import * as cc from '../../cryptocompare';

require('../../styles/style.css');

class App extends React.Component {

  componentDidMount() {
    const { loadUserEmail, loadUserSettings, addPortfolio, initialPortfolio, addWallet, addAsset, addRate, addRate24h, addTrade, addICO } = this.props;

    auth.onAuthStateChanged((user) => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);

        loadUserEmail(auth.currentUser.email, user.uid);

        //TODO: Do we really need to load whole user data to user?
        return database.ref(user.uid).once('value').then((snapshot) => {

          let dbData = fromJS(snapshot.node_.val());

          //load user settings from db
          if  (dbData.getIn(['settings']) === undefined || dbData.getIn(['settings']) === "") {
            console.log("no settings.")
            // create default settings
            database.ref(user.uid).child('settings').set({
              primaryFiat: "EUR"
            });

            loadUserSettings(fromJS({primaryFiat: "EUR"}))
          } else {
            loadUserSettings(dbData.getIn(['settings']))
          }
 
          if (dbData !== null || dbData !== "") {
            
            const wallets = dbData.getIn(['clients', 'own', 'wallets']);
            const portfolios = dbData.getIn(['clients', 'own', 'portfolios']);
            const icos = dbData.getIn(['clients', 'own', 'icos']);
            let collectedRates = [];


            if (wallets !== undefined) {
              
              wallets.entrySeq().forEach(element => {
                addWallet(element[0], element[1].getIn(['name']));
                
                let assets = element[1].getIn(['assets'])
                
                if (assets !== undefined) {

                  //TODO: rewrite price feth to priceMulti to lower API requets
                  assets.entrySeq().forEach(walletAsset => {
                    addAsset(element[0], walletAsset[0], walletAsset[1])

                    // same thing used on line 113, extract it!
                    if (collectedRates.includes(walletAsset[0]) === false) {
                      collectedRates.push(walletAsset[0])
                    }
                
                  })
                }
               });
   
               loadUserSettings(dbData.getIn(['settings']))
            } 


            if (portfolios !== undefined) {
              portfolios.entrySeq().forEach(element => {
                addPortfolio(element[0], element[1].getIn(['name']));
                initialPortfolio(element[0], element[1].getIn(['initial']));

                let trades = element[1].getIn(['trades']);
                if (trades !== undefined) {
                  trades.entrySeq().forEach(trade => {
                    addTrade(
                      element[0],
                      trade[0],
                      trade[1].getIn(['date']),
                      trade[1].getIn(['orderType']),
                      trade[1].getIn(['currency']), 
                      trade[1].getIn(['amount']), 
                      trade[1].getIn(['priceEUR']),
                      trade[1].getIn(['priceBTC'])
                    );


                    if (collectedRates.includes(trade[1].getIn(['currency'])) === false) {
                      collectedRates.push(trade[1].getIn(['currency']))
                    }

                  })
                }
              })
            }


            //fetch all collected rates

            cc.priceMulti(collectedRates, ['BTC', 'USD', 'EUR'])
            .then(prices => {
              Object.entries(prices).forEach(
                ([symbol, price]) => addRate(symbol, price) 
              );
            }).catch(console.error)

            collectedRates.forEach((symbol, index) => {
              window.setTimeout(() => {
              cc.priceHistorical(symbol, ['BTC', 'USD', 'EUR'], new Date(moment().subtract(1, 'day').format('YYYY-MM-DD')))
                .then(prices => {
                  addRate24h(symbol, prices)
                }).catch(console.error)
              }, (1100 * index))
            })

            
            if (icos !== undefined) {
              icos.entrySeq().forEach(element => {
                addICO(element[0], element[1]);
              })
            }
            
            
          } else {
            console.log("no data.")
          }

        });
      } else {
        window.localStorage.removeItem(storageKey);
        return null;
      }
    });
  }

  render() {
    function Page(props) {
      // if user is autenticated they'll see actuall app instead of login window
      if (isAutheticated()) {
        return(
          <div>
            <Header />
            <Main />
          </div>
        );
      } else {
        return(
          <Login />
        )
      }
    }

    return (
      <div>
        <Page />
      </div>		
    )
  }
}

App.propTypes = {
  loadUserEmail: PropTypes.func.isRequired,
  loadUserSettings: PropTypes.func.isRequired,
  addWallet: PropTypes.func.isRequired,
  addAsset: PropTypes.func.isRequired,
  addRate: PropTypes.func.isRequired,
  addRate24h: PropTypes.func.isRequired,
  addPortfolio: PropTypes.func.isRequired,
};

// container part
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...AppActions,
    ...PortfoliosActions,
    ...WalletsActions,
    ...RatesActions,
    ...RatesHistoricalActions,
    ...ICOActions,
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
