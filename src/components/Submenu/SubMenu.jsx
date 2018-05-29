import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { NavLink } from 'react-router-dom';

const SubMenu = ({ group, links, active, visible }) => {
  const navlinks = links.map((link) => {
    return (
      <li key={`${group}-${link.name}-list-item`}>
        <NavLink exact key={`${group}-${link.name}-submenu-link`} activeClassName={active} to={link.path}>{link.name}</NavLink>
      </li>
    );
  });

  const submenuClass = (visible)? 'submenu' : 'submenu-hidden'
  return (
    <ul className={submenuClass}>
      {navlinks}
    </ul>
  );
};

SubMenu.propTypes = {
  links: ImmutablePropTypes.seq.isRequired,
  group: PropTypes.string,
  active: PropTypes.string,
  visible: PropTypes.bool,
};

SubMenu.defaultProps = {
  active: 'active',
  visible: false,
};

export default SubMenu;
