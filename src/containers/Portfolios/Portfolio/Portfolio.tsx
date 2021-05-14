import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { database } from '../../../firebase';
import { handleInputChangesGeneric } from '../../../utils/FormUtils';

import TradesManager from '../TradesManager';
import Trades from '../Trades';

import * as PortfoliosActions from '../actions';

interface PortfolioProps extends RouteComponentProps {
  portfolios: {
    [key: string]: {
      initial: number,
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
  initialPortfolio: (currentPortfolioKey: string, currentPortfolioInvestment: number) => void,
  removePortfolio: (currentPortfolioKey: string) => void,
  user: any
}

interface ComponentState {
  currentPortfolioName: string,
  currentPortfolioKey: string,
  currentPortfolioInvestment: number,
}

class Portfolio extends React.Component<PortfolioProps, ComponentState> {
  constructor(props: PortfolioProps) {
    super(props);

    this.state = {
      currentPortfolioName: '',
      currentPortfolioKey: '',
      currentPortfolioInvestment: 0,
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePortfolioInvestment = this.handlePortfolioInvestment.bind(this);
  }

  componentDidMount() {
    const { portfolios, match } = this.props;
    const { portfolioID } = match.params;
    const portKey = Object.keys(portfolios).filter((pkey) => portfolios[pkey].name === portfolioID)[0];
    const portfolioInvestment = portfolios[portKey] && portfolios[portKey].initial;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      currentPortfolioName: portfolioID,
      currentPortfolioKey: portKey,
      currentPortfolioInvestment: portfolioInvestment,
    });
  }

  handleInputChange(event: any) {
    handleInputChangesGeneric(event, this);
  }

  handlePortfolioInvestment() {
    const { initialPortfolio, user } = this.props;
    const { currentPortfolioKey, currentPortfolioInvestment } = this.state;

    // eslint-disable-next-line no-undef
    if (window.confirm('Are you sure you want to set initial investment?')) {
      database.ref(user.uid).child(`clients/own/portfolios/${currentPortfolioKey}/initial/`).set(Number(currentPortfolioInvestment));

      initialPortfolio(currentPortfolioKey, currentPortfolioInvestment);
    }
  }

  handleRemove() {
    const { removePortfolio, user } = this.props;
    const { currentPortfolioKey, currentPortfolioName } = this.state;

    // eslint-disable-next-line no-undef
    if (window.confirm(`Are you sure you want to remove wallet ${currentPortfolioName}?`)) {
      database.ref(user.uid).child(`clients/own/portfolios/${currentPortfolioKey}`).remove();

      removePortfolio(currentPortfolioKey);
    }
  }

  render() {
    const { portfolios, match, user } = this.props;
    const { portfolioID } = match.params;
    const {
      currentPortfolioName,
      currentPortfolioInvestment,
    } = this.state;
    let portKey = Object.keys(portfolios).filter((pkey) => portfolios[pkey].name === portfolioID)[0];
    const portfolioInvestment = portfolios[portKey] && portfolios[portKey].initial;
    const actualPortfolio = Object.keys(portfolios).filter((pkey) => portfolios[pkey].name === currentPortfolioName);

    if (actualPortfolio.length > 0) {
      [portKey] = Object.keys(portfolios).filter((pkey) => portfolios[pkey].name === currentPortfolioName);

      return (
        <div>
          <p>
            <strong>
              {` ${currentPortfolioName} `}
            </strong>
          </p>

          <p>
            Investment:
            {portfolioInvestment}
            {` ${user.settings.primaryFiat.toUpperCase()} `}
          </p>

          <input
            className="fe"
            type="number"
            placeholder="10"
            name="currentPortfolioInvestment"
            value={currentPortfolioInvestment}
            onChange={this.handleInputChange}
            required
          />

          <button className="fe-btn" type="button" onClick={this.handlePortfolioInvestment}>
            Udate initial investment
          </button>

          <TradesManager portfolioKey={portKey} />
          <Trades portfolioKey={portKey} />
          <br />

          <div>
            <button className="fe-btn" type="button" onClick={this.handleRemove}>
              Remove Portfolio
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <p>
          There is no portfolio named
          {currentPortfolioName}
        </p>
      </div>
    );
  }
}

/* Container part */
const mapStateToProps = (state: any) => ({
  ...state,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  ...PortfoliosActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio));
