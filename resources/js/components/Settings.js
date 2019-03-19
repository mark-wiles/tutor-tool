import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarTop from './NavbarTop';

class Settings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			settings: []
		};
	}

	handleLogout() {
		event.preventDefault();
		axios.post('/logout', {
		  })
		  .then((response) => {
			window.location.replace('/login');
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	render() {

		return(
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="fas fa-times orange" linkLeft="/home" linkRight="/home" title="Settings" />
				<div className="container content-container">
					<Link to={'/students/inactive'}>
						<h5 className="orange pb-2 pt-2 bb-1-s">View Hidden Students</h5>
					</Link>

					<h5 className="orange pointer pt-2" onClick={this.handleLogout}>Logout</h5>
				</div>
			</div>
		);
	}
}

export default Settings;