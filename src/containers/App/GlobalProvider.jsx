import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import * as cc from '../../cryptocompare';
import { database, auth, storageKey, isAutheticated } from '../../firebase';

export const GlobalContext = React.createContext();
export const GlobalConsumer = GlobalContext.Consumer;

class GlobalProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      globallyAccesibleThing: "vooooo",
      userData: {},
      testValue: '',
      setTestValue: ({ value }) => this.setState({ testValue: value }),
    };
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //window.localStorage.setItem(storageKey, user.uid);

        database.ref(user.uid).once('value').then((snapshot) => {
          let dbData = snapshot.node_.val();
          this.setState({
            userData: dbData
          })
        });
      }

      window.localStorage.removeItem(storageKey);

    })
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          state: this.state,
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
};

GlobalProvider.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.node
      })
    })
  };

  GlobalProvider.defaultProps = {
    match: { params: { id: null } }
  };

  export default withRouter(props => <GlobalProvider {...props} />);
