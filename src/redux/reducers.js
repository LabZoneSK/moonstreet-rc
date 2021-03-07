/* Main Redux Reducers file */
import { combineReducers } from 'redux';

/* Import feature reducers */
import portfolios from '../containers/Portfolios/reducer';
import wallets from '../containers/Wallets/reducer';
import rates from '../containers/Rates/reducer';
import ratesHistorical from '../containers/RatesHistorical/reducer';
import user from '../containers/App/reducer';
import icos from '../containers/ICO/reducer';
import coinPotential from '../containers/CoinPotential/reducer';

const reducers = combineReducers({
  /* Add imported reducers */
  portfolios,
  wallets,
  rates,
  ratesHistorical,
  user,
  icos,
  coinPotential,
});

export default reducers;
