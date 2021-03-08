import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class GetTotal extends React.Component {

  render() {

    const { rates, assets } = this.props;

    let sum = 0;
    let sumHisto = 0;

     //TODO: this is really shitty piece of code
    assets.toSeq().forEach((amount, symbol, i) => {
      sum += (Number(rates.getIn([symbol, this.props.assetRate, 'PRICE'])) * amount)
      sumHisto += ((Number(rates.getIn([symbol, this.props.assetRate, 'HIGH24HOUR']) + rates.getIn([symbol, this.props.assetRate, 'LOW24HOUR'])) / 2) * amount)
    })

    let delta = (100 * (sum / sumHisto)) - 100;

    return (
      <div>
        { this.props.assetRate === 'BTC' ? '₿' : ''}
        { this.props.assetRate === 'EUR' ? '€' : ''}
        { this.props.assetRate === 'USD' ? '$' : ''}
        {Number(sum).toFixed(4)}
        <span className={'detlaSpan ' + (delta < 0 ? 'neg' : 'pos')}>{Number(delta).toFixed(2)}%</span>
      </div>
    )
  }
};

GetTotal.propTypes = {
  //returnRate: PropTypes.func.isRequired,
};

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    //...RatesActions,
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetTotal));
