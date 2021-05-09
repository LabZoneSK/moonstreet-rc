import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';

import * as ICOActions from './actions';

/* Components */
import ICOManager from './ICOManager';
import ICOListView from './ICOListView';

class ICOs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icos: fromJS({}),
    };
  }

  componentDidMount() {
    // this.props.fetchICOs(this.props.user.getIn(['uid']));
    const { icos } = this.props;

    if (icos !== undefined) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        icos,
      });
    }
  }

  render() {
    const { icos } = this.state;

    return (
      <div>
        <ICOManager />
        <ICOListView icos={icos} />
      </div>
    );
  }
}

ICOs.propTypes = {
  // eslint-disable-next-line react/no-typos
  icos: ImmutablePropTypes.map.isRequired,
};

/* Container part */
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...ICOActions,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ICOs));
