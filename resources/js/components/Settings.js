import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarTop from './NavbarTop';

class Earnings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			settings: []
		};
	}

	componentDidMount() {
		console.log('settings mounted');
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
						<h4 className="pt-4">View Hidden Students</h4>
					</Link>

					<h4 className="orange pt-2" onClick={this.handleLogout}>Logout</h4>
				</div>
			</div>
		);
	}
}

export default Earnings;