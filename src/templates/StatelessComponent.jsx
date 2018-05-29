/** Example of stateless (pure) component 
	@see: https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
*/

import React from 'react';
require('./stateless.scss');

const StatelessComponent = (props) => (
	<div className='component-one'>
		<p>React .14 introduced a simpler way to define components called stateless functional components.</p>
		<img src="https://cdn-images-1.medium.com/max/800/1*zyaxLgvQHfgaDjMoP90XAw.png" alt="Example code of stateless component" />
	</div>
);

export default StatelessComponent;