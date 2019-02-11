import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
			<div className="content-container">
				<h2 className="font-weight-bold">Settings</h2>
				<button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
			</div>
		);
	}
}

export default Earnings;