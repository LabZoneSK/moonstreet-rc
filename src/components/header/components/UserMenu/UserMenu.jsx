import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

// const UserMenu = (props) => (
// <a className='user' href='#'>{this.props.user.email}</a>
// );

const UserMenu = (props) => {
  const { user } = props;
  return (
    <a className="user" href="#usermenu"><span>{user.get('email').substring(0, 2)}</span></a>
  );
};

UserMenu.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps)(UserMenu);
