import React from 'react';

function handleClick(e) {
  // eslint-disable-next-line no-undef
  const app = document.querySelector('.main');
  e.preventDefault();
  app.classList.toggle('toggle-menu');
}

const menuToggle = () => (
  <a id="menu" href="#menu" onClick={handleClick}>M</a>
);

export default menuToggle;
