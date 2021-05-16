import {
  PORTFOLIO_ADD,
  PORTFOLIO_REMOVE,
  PORTFOLIO_NOTES,
  PORTFOLIOS_INITIAL,
  TRADE_ADD,
  TRADE_REMOVE,
} from './constants';

/* Action Creators */
export function addPortfolio(portfolioKey, portfolioName) {
  return {
    type: PORTFOLIO_ADD,
    portfolioKey,
    portfolioName,
  };
}

export function removePortfolio(portfolioKey) {
  return {
    type: PORTFOLIO_REMOVE,
    portfolioKey,
  };
}

export function notesPortfolio(portfolioKey, notes) {
  return {
    type: PORTFOLIO_NOTES,
    portfolioKey,
    notes,
  };
}

export function addTrade(
  portfolioKey,
  tradeKey,
  tradeDate,
  tradeOrderType,
  tradeCurrency,
  tradeAmmount,
  tradePriceEUR,
  tradePriceBTC,
) {
  return {
    type: TRADE_ADD,
    portfolioKey,
    tradeKey,
    tradeDate,
    tradeOrderType,
    tradeCurrency,
    tradeAmmount,
    tradePriceEUR,
    tradePriceBTC,
  };
}

export function removeTrade(portfolioKey, tradeKey) {
  return {
    type: TRADE_REMOVE,
    portfolioKey,
    tradeKey,
  };
}

export function setInitialPortfolios(portfoliosData) {
  return {
    type: PORTFOLIOS_INITIAL,
    portfoliosData,
  };
}
