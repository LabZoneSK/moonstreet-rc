import { removeKey } from '../../utils/Utils';
import {
  PORTFOLIO_ADD,
  PORTFOLIO_REMOVE,
  PORTFOLIO_INITIAL,
  TRADE_ADD,
  TRADE_REMOVE,
  PORTFOLIOS_INITIAL,
} from './constants';

const portfoliosReducer = (state = {}, action) => {
  switch (action.type) {
    case PORTFOLIO_ADD:
      return {
        ...state,
        [action.portfolioKey]: { name: action.portfolioName },
      };
    case PORTFOLIO_REMOVE:
      return removeKey(state, action.portfolioKey);
    case PORTFOLIO_INITIAL:
      return {
        ...state,
        [action.portfolioKey]: {
          ...state[action.portfolioKey],
          initial: action.initialInvestment,
        },
      };
    case TRADE_ADD:
      return {
        ...state,
        [action.portfolioKey]: {
          ...state[action.portfolioKey],
          trades: {
            ...state[action.portfolioKey].trades,
            [action.tradeKey]: {
              date: action.tradeDate,
              orderType: action.tradeOrderType,
              currency: action.tradeCurrency,
              amount: action.tradeAmmount,
              priceEUR: action.tradePriceEUR,
              priceBTC: action.tradePriceBTC,
            },
          },
        },
      };
    case TRADE_REMOVE:
      return {
        ...state,
        [action.portfolioKey]: {
          ...state[action.portfolioKey],
          trades: removeKey(state[action.portfolioKey].trades, action.tradeKey),
        },
      };
    case PORTFOLIOS_INITIAL:
      return action.portfoliosData;
    default:
      return state;
  }
};

export default portfoliosReducer;
