import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Earnings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			earnings: []
		};
	}

	// componentDidMount() {
	// 	axios.get('/earnings'
	// 	)
	// 	.then((response) => {
	// 		var earnings = response.data;
	// 		this.setState({earnings});
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	});
	// }

	render() {

		// const allEarnings = this.state.earnings.map((earning) =>
			
		// 		<div className="earning-summary" key={earning.id}>
		// 			<Link to={'earning/' + earning.id}>
		// 				<h4 className="font-weight-bold mb-1">{earning.first_name}</h4>
		// 				<h6>{earning.city}, {earning.state} {earning.zip}</h6>
		// 			</Link>
		// 		</div>
			
		// )

		return(
			<div className="content-container">
				<h2 className="font-weight-bold">Earnings</h2>
				{/* { allEarnings } */}
			</div>
		);
	}
}

export default Earnings;