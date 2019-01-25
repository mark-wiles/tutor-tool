import React from 'react';

const Icon = (props) => (
	<div className="icon-container text-center">
		<i className={ props.className }></i>
		<h6 className="icon-text mb-0">{props.title}</h6>
	</div>
)

export default Icon;