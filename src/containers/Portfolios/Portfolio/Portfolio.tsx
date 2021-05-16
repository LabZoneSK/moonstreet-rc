import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { database } from '../../../firebase';

import TradesManager from '../TradesManager';
import Trades from '../Trades';

import * as PortfoliosActions from '../actions';

interface PortfolioProps extends RouteComponentProps {
  portfolios: {
    [key: string]: {
      initial: number,
      notes: string,
      name: string,
      trades: {
        amount: string,
        currency: string,
        date: string,
        orderType: string,
        priceBTC: string,
        priceEur: string
      },
    }
  },
  match: {
    isExact: boolean,
    path: string,
    url: string,
    params: {
      portfolioID: string,
    },
  },
  notesPortfolio: (currentPortfolioKey: string, currentPortfolioNotes: string) => void,
  removePortfolio: (currentPortfolioKey: string) => void,
  user: any
}

interface ComponentState {
  currentPortfolioName: string,
  currentPortfolioKey: string,
  currentPortfolioNotes: string,
}

type PortFolioTypes = PortfolioProps & ComponentState;

const Portfolio: React.FC<PortFolioTypes> = (props: PortFolioTypes) => {
  const {
    user,
    notesPortfolio,
    removePortfolio,
    portfolios,
    match,
  } = props;

  const [currentPortfolioName, setCurrentPortfolioName] = useState('');
  const [currentPortfolioKey, setCurrentPortfolioKey] = useState('');
  const [currentPortfolioNotes, setCurrentPortfolioNotes] = useState('');
  const [actualPortfolio, setActualPortfolio] = useState({});

  useEffect(() => {
    const { portfolioID } = match.params;
    const identifyPortKey = Object.keys(portfolios).filter((pkey) => portfolios[pkey].name === portfolioID)[0];
    setActualPortfolio(portfolios[identifyPortKey]);
    setCurrentPortfolioName(portfolioID);
    setCurrentPortfolioKey(identifyPortKey);
    setCurrentPortfolioNotes(portfolios[identifyPortKey] && portfolios[identifyPortKey].notes);
  }, []);

  const handlePortfolioNotes = () => {
    database.ref(user.uid).child(`clients/own/portfolios/${currentPortfolioKey}/notes/`).set(currentPortfolioNotes);
    notesPortfolio(currentPortfolioKey, currentPortfolioNotes);
  };

  const handleRemove = () => {
    // eslint-disable-next-line no-undef
    if (window.confirm(`Are you sure you want to remove wallet ${currentPortfolioName}?`)) {
      database.ref(user.uid).child(`clients/own/portfolios/${currentPortfolioKey}`).remove();
      removePortfolio(currentPortfolioKey);
    }
  };

  return (
    <>
      {Object.keys(actualPortfolio).length > 0 ? (
        <div>
          <p>
            <strong>
              {` ${currentPortfolioName} `}
            </strong>
          </p>

          <TradesManager portfolioKey={currentPortfolioKey} />
          <Trades portfolioKey={currentPortfolioKey} />
          <br />

          <input
            className="fe"
            type="textarea"
            name="currentPortfolioNotes"
            value={currentPortfolioNotes}
            onChange={(e: any) => setCurrentPortfolioNotes(e.target.value)}
          />

          <button className="fe-btn" type="button" onClick={handlePortfolioNotes}>
            Save notes
          </button>
          <br />

          <div>
            <button className="fe-btn" type="button" onClick={handleRemove}>
              Remove Portfolio
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>
            There is no portfolio named
            {currentPortfolioName}
          </p>
        </div>
      )}
    </>
  );
};

/* Container part */
const mapStateToProps = (state: any) => ({
  ...state,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  ...PortfoliosActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio));
