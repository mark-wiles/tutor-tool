import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

class NavbarBottom extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		return(

			<nav className="container nav-bottom">

				<Link to="/home">
					<Icon className="fas fa-users orange" title="Students"/>
				</Link>

				<Link to="/lessons">
					<Icon className="fas fa-calendar-alt orange" title="Lessons"/>
				</Link>

				<Icon className="fas fa-comment orange" title="Messages"/>

				<Icon className="fas fa-dollar-sign orange" title="Earnings"/>

			</nav>

		)

	}
	
}

export default NavbarBottom;