import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class GetValue extends React.Component {

  render() {

    const { rates } = this.props;

    let delta = rates.getIn([this.props.assetKey, this.props.assetRate, 'CHANGEPCT24HOUR']);

    let value = rates.getIn([this.props.assetKey, this.props.assetRate, 'PRICE']) * this.props.assetVolume;

    return (
      <div>
        { this.props.assetRate === 'BTC' ? '₿' : ''}
        { this.props.assetRate === 'EUR' ? '€' : ''}
        { this.props.assetRate === 'USD' ? '$' : ''}
        {Number(value).toFixed(4)}
        <span className={'detlaSpan ' + (delta < 0 ? 'neg' : 'pos')}>{Number(delta).toFixed(2)}%</span>
      </div>
    )
  }
};

GetValue.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetValue));
