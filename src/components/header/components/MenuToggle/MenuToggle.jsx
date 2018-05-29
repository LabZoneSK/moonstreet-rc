import React from 'react';

function handleClick(e) {
  let app = document.querySelector('.main');
  e.preventDefault();
  app.classList.toggle('toggle-menu');
}

const menuToggle = (props) => (
    <a id='menu' href='#menu' onClick={handleClick}>M</a>
);

export default menuToggle;