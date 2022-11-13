import React from 'react';

function handleClick(e) {
  // eslint-disable-next-line no-undef
  const app = document.querySelector('.main');
  e.preventDefault();
  app.classList.toggle('toggle-menu');
}

const menuToggle = () => (
  <a id="menu" href="#menu" onClick={handleClick}>
    <svg viewBox="0 0 100 80" width="40" height="40">
      <rect width="100" height="16" />
      <rect y="30" width="100" height="16" />
      <rect y="60" width="100" height="16" />
    </svg>
  </a>
);

export default menuToggle;
