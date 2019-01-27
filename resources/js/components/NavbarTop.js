import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Icon from './Icon';

class NavbarTop extends Component {

	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	console.log(this.props);
	// }

	// handleLogout() {
	// 	event.preventDefault();
	// 	axios.post('/logout', {
	// 	  })
	// 	  .then(function (response) {
	// 		window.location.replace('/');
	// 	  })
	// 	  .catch(function (error) {
	// 		console.log(error);
	// 	  });
	// }

	render() {
		return(
			<nav className="container nav-top">
				<Link to={this.props.linkLeft}><Icon className="fas fa-cog orange" /></Link>
				<h2 className="mb-0 text-center">{this.props.title}</h2>
				<Link to={this.props.linkRight}><Icon className={this.props.iconClass} /></Link>
			</nav>
		)
	}
}

export default NavbarTop;