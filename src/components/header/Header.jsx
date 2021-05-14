import React from 'react';
import Logo from './components/Logo';
import MenuToggle from './components/MenuToggle';
import UserMenu from './components/UserMenu/UserMenu.tsx';

const Header = () => (
  <header className="header">
    <Logo />
    <MenuToggle />
    <UserMenu />
  </header>
);

export default Header;
