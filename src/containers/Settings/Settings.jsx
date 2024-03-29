import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as RatesActions from '../Rates/actions';
import { database } from '../../firebase';
import * as AppActions from '../App/actions';

const Settings = (props) => {
  const {
    user,
    loadUserSettings,
  } = props;

  const [primaryFiat, setPrimaryFiat] = useState(user.settings.primaryFiat);

  const saveSettings = () => {
    const primaryFiatDBRef = database.ref(user.uid).child('settings/primaryFiat/');
    primaryFiatDBRef.set(primaryFiat);

    loadUserSettings({ primaryFiat });
  };

  const handleInputChange = (e) => {
    setPrimaryFiat(e.target.value);
  };

  return (
    <>
      <div>Settings</div>
      <p>
        Email:
        {` ${user.email}`}
      </p>

      <p>
        <label htmlFor="primaryFiat">
          Primary FIAT:
        </label>
        <select
          className="fe"
          id="primaryFiat"
          name="primaryFiat"
          value={primaryFiat}
          onChange={handleInputChange}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
        <br />
      </p>
      <button className="fe-btn" onClick={saveSettings} type="button">Save settings</button>
    </>
  );
};

Settings.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    settings: PropTypes.shape({
      primaryFiat: PropTypes.string,
    }),
  }).isRequired,
  loadUserSettings: PropTypes.func.isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...AppActions,
  ...RatesActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
