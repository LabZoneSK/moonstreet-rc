import React from 'react';
import { connect } from 'react-redux';

type UserMenuProps = {
  user: {
    email: string,
    primaryFiat: string,
    uid: string
  }
}

const UserMenu: React.FC<UserMenuProps> = (props: UserMenuProps) => {
  const { user } = props;
  return (
    <a className="user" href="#usermenu"><span>{user.email.substring(0, 2)}</span></a>
  );
};

const mapStateToProps = (state: any) => ({
  ...state,
});

export default connect(mapStateToProps)(UserMenu);
