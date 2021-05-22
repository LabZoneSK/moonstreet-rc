import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import cx from 'classnames';
import { database } from '../../../firebase';

import TradesManager from '../TradesManager';
import Trades from '../Trades';

import * as PortfoliosActions from '../actions';

import styles from './Portfolio.module.scss';

interface PortfolioProps extends RouteComponentProps {
  portfolios: {
    [key: string]: {
      initial: number,
      notes: string,
      name: string,
      trades: {
        [key: string]: {
          amount: string,
          currency: string,
          date: string,
          orderType: string,
          priceBTC: string,
          priceEUR: string
        },
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
  user: any,
  rates: any,
}

interface ComponentState {
  currentPortfolioName: string,
  currentPortfolioKey: string,
  currentPortfolioNotes: string,
}

interface PieDataObject {
  labels: string[],
  datasets: [{
    label: string,
    data: string[],
    backgroundColor: string[],
    hoverOffset: 4,
  }],
}

interface PortFolioTypes extends PortfolioProps, ComponentState {}

const Portfolio: React.FC<PortFolioTypes> = (props: PortFolioTypes) => {
  const {
    user,
    notesPortfolio,
    removePortfolio,
    portfolios,
    match,
    rates,
  } = props;

  const pieOptions = {
    responsive: true,
  };

  const [currentPortfolioName, setCurrentPortfolioName] = useState('');
  const [currentPortfolioKey, setCurrentPortfolioKey] = useState('');
  const [currentPortfolioNotes, setCurrentPortfolioNotes] = useState('');
  const [actualPortfolio, setActualPortfolio] = useState({});
  const [pieData, setPieData] = useState({});
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [portfolioPerformance, setPortfolioPerformance] = useState(0);

  const getRandomInt = (imin: number, imax: number): number => {
    const min = Math.ceil(imin);
    const max = Math.floor(imax);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const { portfolioID } = match.params;
    const identifyPortKey = Object.keys(portfolios).filter((pkey) => portfolios[pkey].name === portfolioID)[0];
    setActualPortfolio(portfolios[identifyPortKey]);
    setCurrentPortfolioName(portfolioID);
    setCurrentPortfolioKey(identifyPortKey);
    setCurrentPortfolioNotes(portfolios[identifyPortKey] && portfolios[identifyPortKey].notes);

    const pieDataObject: PieDataObject = {
      labels: [],
      datasets: [{
        label: portfolioID,
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      }],
    };

    let investmentInitialValue = 0;
    let investmentCurrentValue = 0;

    if (portfolios[identifyPortKey].trades && Object.keys(portfolios[identifyPortKey].trades).length > 0) {
      Object.keys(portfolios[identifyPortKey].trades).forEach((tradeKey) => {
        pieDataObject.labels.push(portfolios[identifyPortKey].trades[tradeKey].currency);

        const value = Number(portfolios[identifyPortKey].trades[tradeKey].amount) * rates[portfolios[identifyPortKey].trades[tradeKey].currency].EUR.PRICE;
        pieDataObject.datasets[0].data.push(`${value}`);

        const color = `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;
        pieDataObject.datasets[0].backgroundColor.push(`${color}`);

        investmentCurrentValue += value;
        investmentInitialValue += Number(portfolios[identifyPortKey].trades[tradeKey].priceEUR);
      });
    }

    setTotalInvestment(investmentInitialValue);
    setTotalValue(investmentCurrentValue);
    setPortfolioPerformance(investmentCurrentValue / (investmentInitialValue / 100) - 100);
    setPieData(pieDataObject);
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

          <div className={styles.fiftyFifty}>

            <div>
              <p>
                {`Initial investment: ${totalInvestment}`}
                <br />
                {`Current value: ${totalValue.toFixed(2)}`}
                <br />
                Performance:
                <span
                  className={cx({
                    detlaSpan: true,
                    pos: portfolioPerformance > 0,
                    neg: portfolioPerformance < 0,
                  })}
                >
                  {` ${portfolioPerformance.toFixed(2)}%`}
                </span>
              </p>
              <br />

              <TradesManager portfolioKey={currentPortfolioKey} />
            </div>

            <div>
              <Pie type="pie" options={pieOptions} data={pieData} />
            </div>

          </div>

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
