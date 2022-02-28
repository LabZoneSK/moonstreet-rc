/* Main Redux Reducers file */
import { combineReducers } from 'redux';

/* Import feature reducers */
import portfolios from '../containers/Portfolios/reducer';
import wallets from '../containers/Wallets/reducer';
import rates from '../containers/Rates/reducer';
import user from '../containers/App/reducer';
import icos from '../containers/ICO/reducer';
import archive from '../containers/Archive/reducer';

const reducers = combineReducers({
  /* Add imported reducers */
  portfolios,
  wallets,
  rates,
  user,
  icos,
  archive,
});

export default reducers;
