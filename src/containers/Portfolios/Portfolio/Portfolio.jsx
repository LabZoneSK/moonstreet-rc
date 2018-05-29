/**
 *
 * Wallet
 *
 * Write description
 */

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
      currentPortfolioInvestment: 0
    }

    this.handleRemove = this.handleRemove.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePortfolioInvestment = this.handlePortfolioInvestment.bind(this);
  }

  handleInputChange(event) {
    handleInputChangesGeneric(event, this);
  }


  componentDidMount() {
    let { portfolioID } = this.props.match.params;
    const { portfolios } = this.props;
    const portfolioKey = findWalletKey(portfolios, portfolioID, 'name');
    let portfolioInvestment = portfolios.getIn([portfolioKey, 'initial'])
    
    this.setState({
      currentPortfolioName: portfolioID,
      currentPortfolioKey: portfolioKey,
      currentPortfolioInvestment: portfolioInvestment
    })
  }

  handlePortfolioInvestment() {
    const { initialPortfolio } = this.props;

    if (window.confirm("Are you sure you want to set initial investment?")) {
  
      database.ref(this.props.user.getIn(['uid'])).child('clients/own/portfolios/' + this.state.currentPortfolioKey + '/initial/').set(Number(this.state.currentPortfolioInvestment));
      
      initialPortfolio(this.state.currentPortfolioKey, this.state.currentPortfolioInvestment)
    }
  }


  handleRemove(e) {
    const { removePortfolio } = this.props;

    if (window.confirm("Are you sure you want to remove wallet " + this.state.currentPortfolioName + "?")) {
      database.ref(this.props.user.getIn(['uid'])).child('clients/own/portfolios/' + this.state.currentPortfolioKey).remove();

      removePortfolio(this.state.currentPortfolioKey)
    }
     
  }

    render() {
      let { portfolioID } = this.props.match.params;  
    const { portfolios } = this.props;
    const portfolioKey = findWalletKey(portfolios, portfolioID, 'name');
    const portfolioInvestment = portfolios.getIn([portfolioKey, 'initial'])
   
    const actualPortfolio = findWallet(portfolios, this.state.currentPortfolioName, 'name');

    if (actualPortfolio !== undefined) {

      const portfolioKey = findWalletKey(portfolios, this.state.currentPortfolioName, 'name');

      return(
        <div>
          <p>This is <strong>{this.state.currentPortfolioName}</strong> portfolio</p>

          <p>Investment: {portfolioInvestment} EUR</p>

          <input className="fe" type="number" placeholder="10" name="currentPortfolioInvestment" value={this.state.currentPortfolioInvestment} onChange={this.handleInputChange} required />
          
          <button className="fe-btn" type="add" onClick={this.handlePortfolioInvestment}>Udate initial investment</button>

         
          <TradesManager portfolioKey={portfolioKey} />
          <Trades  portfolioKey={portfolioKey} />
          <br />
          
          <div>
            <button className="fe-btn" type="remove" onClick={this.handleRemove}>Remove Portfolio</button>
          </div>
        </div>
      )

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


    } else {
      return (
        <div>
          <p>There's no portfolio named {this.state.currentWalletName}</p>           
        </div>          
      )
    }
  }
}

Portfolio.propTypes = {
  portfolios: ImmutablePropTypes.map.isRequired,
  removePortfolio: PropTypes.func.isRequired,
  initialPortfolio: PropTypes.func.isRequired,
};

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...PortfoliosActions,
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio));
