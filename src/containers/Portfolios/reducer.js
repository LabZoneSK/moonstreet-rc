
import { fromJS } from 'immutable';
import {
  PORTFOLIO_ADD,
  PORTFOLIO_REMOVE,
  PORTFOLIO_INITIAL,
  TRADE_ADD,
  TRADE_REMOVE,
  PORTFOLIOS_INITIAL,
} from './constants';

/* TODO: Revisit if initial state below is needed, since it isn't really used for anything */
const initialState = fromJS({});


const portfoliosReducer = (state = initialState, action) => {
  switch (action.type) {
    case PORTFOLIO_ADD:
      return state
        .set(action.portfolioKey, fromJS({ name: action.portfolioName }));
    case PORTFOLIO_REMOVE:
      return state
        .delete(action.portfolioKey)
    case PORTFOLIO_INITIAL:
      return state
        .mergeIn([action.portfolioKey], fromJS({ initial: action.initialInvestment }));
    case TRADE_ADD:
      return state
        .mergeIn([action.portfolioKey, 'trades', action.tradeKey ],
          fromJS({
            date: action.tradeDate,
            orderType: action.tradeOrderType,
            currency: action.tradeCurrency,
            amount: action.tradeAmmount,
            priceEUR: action.tradePriceEUR,
            priceBTC: action.tradePriceBTC,
          }));
    case TRADE_REMOVE:
      return state
        .deleteIn([ action.portfolioKey, 'trades', action.tradeKey]);
    case PORTFOLIOS_INITIAL:
      return fromJS(action.portfoliosData);
    default:
      return state;
  }
};

export default portfoliosReducer;
