import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as RatesActions from '../Rates/actions';

const Dashboard = (props) => {
  const { rates } = props;

  const ratesArray = [];

  Object.keys(rates).forEach((assetKey) => {
    const deltaEUR = Number(rates[assetKey].EUR.CHANGEPCT24HOUR).toFixed(2);
    ratesArray.push({ name: [assetKey], price: deltaEUR });
  });

  ratesArray.sort((a, b) => b.price - a.price);

  return (
    <>
      <div>Welcome</div>
      {ratesArray.length > 0 && (
        <>
          <p>Top coins in last 24h are:</p>
          <p>
            {` ${ratesArray[0].name} `}
            with
            <strong>
              {` ${ratesArray[0].price}% `}
            </strong>
            change.
          </p>
          {ratesArray[1] && (
            <p>
              {` ${ratesArray[1].name} `}
              with
              <strong>
                {` ${ratesArray[1].price}% `}
              </strong>
              change.
            </p>
          )}
          {ratesArray[2] && (
            <p>
              {` ${ratesArray[2].name} `}
              with
              <strong>
                {` ${ratesArray[2].price}% `}
              </strong>
              change.
            </p>
          )}
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  rates: PropTypes.shape({}).isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...RatesActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
