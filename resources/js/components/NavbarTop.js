import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const NavbarTop = (props) => (

			<nav className="container nav-top">
				<Link to={props.linkLeft}><Icon className={props.classLeft} /></Link>
				<h2 className="mb-0 pl-3 pr-3 text-center">{props.title}</h2>
				<Link to={props.linkRight}><Icon className={props.classRight} /></Link>
			</nav>
		)

export default NavbarTop;