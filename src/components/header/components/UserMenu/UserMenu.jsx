import React from 'react';
import { connect } from "react-redux";

// const UserMenu = (props) => (
// 	<a className='user' href='#'>{this.props.user.email}</a>
// );

class UserMenu extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <a className='user' href='#usermenu'>{user.get('email')}</a>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(UserMenu);
