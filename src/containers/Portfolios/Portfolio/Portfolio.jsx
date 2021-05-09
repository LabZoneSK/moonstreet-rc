import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { database } from '../../../firebase';

import { handleInputChangesGeneric } from '../../../utils/FormUtils';

import TradesManager from '../TradesManager';
import Trades from '../Trades';

import * as PortfoliosActions from '../actions';
import {
  findWallet,
  findWalletKey,
} from '../../Wallets/WalletsUtils';

class Portfolio extends React.Component {
  constructor(props) {
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
    const portfolioKey = findWalletKey(portfolios, portfolioID, 'name');
    const portfolioInvestment = portfolios.getIn([portfolioKey, 'initial']);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      currentPortfolioName: portfolioID,
      currentPortfolioKey: portfolioKey,
      currentPortfolioInvestment: portfolioInvestment,
    });
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }

  handlePortfolioInvestment() {
    const { initialPortfolio, user } = this.props;
    const { currentPortfolioKey, currentPortfolioInvestment } = this.state;

    // eslint-disable-next-line no-undef
    if (window.confirm('Are you sure you want to set initial investment?')) {
      database.ref(user.getIn(['uid'])).child(`clients/own/portfolios/${currentPortfolioKey}/initial/`).set(Number(currentPortfolioInvestment));

      initialPortfolio(currentPortfolioKey, currentPortfolioInvestment);
    }
  }

  handleRemove() {
    const { removePortfolio, user } = this.props;
    const { currentPortfolioKey, currentPortfolioName } = this.state;

    // eslint-disable-next-line no-undef
    if (window.confirm(`Are you sure you want to remove wallet ${currentPortfolioName}?`)) {
      database.ref(user.getIn(['uid'])).child(`clients/own/portfolios/${currentPortfolioKey}`).remove();

      removePortfolio(currentPortfolioKey);
    }
  }

  render() {
    const { portfolios, match, user } = this.props;
    const { portfolioID } = match.params;
    const {
      currentPortfolioName,
      currentPortfolioInvestment,
      currentWalletName,
    } = this.state;
    let portfolioKey = findWalletKey(portfolios, portfolioID, 'name');
    const portfolioInvestment = portfolios.getIn([portfolioKey, 'initial']);

    const actualPortfolio = findWallet(portfolios, currentPortfolioName, 'name');

    if (actualPortfolio !== undefined) {
      portfolioKey = findWalletKey(portfolios, currentPortfolioName, 'name');

      return (
        <div>
          <p>
            This is
            <strong>
              {` ${currentPortfolioName} `}
            </strong>
            portfolio
          </p>

          <p>
            Investment:
            {portfolioInvestment}
            {` ${user.getIn(['settings', 'primaryFiat'])} `}
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

          <TradesManager portfolioKey={portfolioKey} />
          <Trades portfolioKey={portfolioKey} />
          <br />

          <div>
            <button className="fe-btn" type="button" onClick={this.handleRemove}>
              Remove Portfolio
            </button>
          </div>
        </div>
      );

      // if (actualPortfolio.get('assets') === undefined) {
      //   return (
      //     <div>
      //       <h3>{this.state.currentPortfolioName}</h3>
      //       <AssetsManager />
      //       <p>No assets in wallet.</p>
      //       <button type="remove" onClick={this.handleRemove}>Remove Wallet</button>
      //     </div>
      //   );
      // } else {
      //   const assetsView = showAssets(actualPortfolio.get('assets'), walletKey);

      //   return (
      //     <div>
      //       <h3>{this.state.currentPortfolioName}</h3>

      //       <AssetsManager />

      //       <div>{assetsView}</div>

      //       <button type="remove" onClick={this.handleRemove}>Remove Wallet</button>
      //     </div>
      //   );
      // }
    }
    return (
      <div>
        <p>
          There is no portfolio named
          {currentWalletName}
        </p>
      </div>
    );
  }
}

Portfolio.propTypes = {
  // eslint-disable-next-line react/no-typos
  portfolios: ImmutablePropTypes.map.isRequired,
  // eslint-disable-next-line react/no-typos
  user: ImmutablePropTypes.map.isRequired,
  removePortfolio: PropTypes.func.isRequired,
  initialPortfolio: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      portfolioID: PropTypes.string,
    }),
  }).isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...PortfoliosActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio));
