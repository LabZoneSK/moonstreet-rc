import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SubMenu = ({
  group, links, active, visible,
}) => {
  const navlinks = links.map((link) => (
    <li key={`${group}-${link.name}-list-item`}>
      <NavLink exact key={`${group}-${link.name}-submenu-link`} activeClassName={active} to={link.path}>{link.name}</NavLink>
    </li>
  ));

  const submenuClass = (visible) ? 'submenu' : 'submenu-hidden';
  return (
    <ul className={submenuClass}>
      { navlinks }
    </ul>
  );
};

SubMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
  group: PropTypes.string.isRequired,
  active: PropTypes.string,
  visible: PropTypes.bool,
};

SubMenu.defaultProps = {
  active: 'active',
  visible: false,
};

export default SubMenu;
