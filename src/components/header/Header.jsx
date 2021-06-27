import React from 'react';
import Logo from './components/Logo';
import MenuToggle from './components/MenuToggle';
import RefreshButton from '../../containers/Rates/RateRefresh';

const Header = () => (
  <header className="header">
    <Logo />
    <MenuToggle />
    <RefreshButton />
  </header>
);

export default Header;
