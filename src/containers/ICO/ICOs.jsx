import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fromJS } from 'immutable';

import * as ICOActions from './actions';

/* Components */
import ICOManager from './ICOManager';
import ICOListView from './ICOListView';

class ICOs extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      icos: fromJS({})
    };
  }

  componentDidMount() {
    //this.props.fetchICOs(this.props.user.getIn(['uid']));

    if (this.props.icos != undefined) {
      this.setState({
        icos: this.props.icos
      })
    }
  }


  render () {

      return (<div>
          <ICOManager />

          <ICOListView icos={ this.state.icos } />
      </div>);
  };
}

/* Container part */
const mapStateToProps = (state) => {
  return {
    ...state,
  }
};
  
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...ICOActions,
  }, dispatch);
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ICOs));