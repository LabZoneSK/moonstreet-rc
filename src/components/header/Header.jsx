import React from 'react';
import Logo from './components/Logo';
import MenuToggle from './components/MenuToggle';
import UserMenu from './components/UserMenu';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <MenuToggle />
      <UserMenu />
    </header>
  );
};

export default Header;
