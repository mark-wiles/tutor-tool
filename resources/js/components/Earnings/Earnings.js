import React, { Component } from 'react';
import NavbarTop from '../NavbarTop';
import axios from 'axios';

class Earnings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			earnings: []
		};
	}

	componentDidMount() {
		axios.get('/api/earnings'
		)
		.then((response) => {
			var earnings = response.data;
			this.setState({earnings});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	render() {

		return(
			<div className="row">
				<NavbarTop 
					classLeft="fas fa-arrow-left orange"
					classRight=""
					linkLeft="/home"
					linkRight=""
					title="Earnings"
				/>
				
				<div className="container content-container">
					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="earnings-title">7 Days: </h5>
						<h5 className="info mb-0 orange">{'$' + this.state.earnings.week}</h5>
					</div>

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="earnings-title">30 Days: </h5>
						<h5 className="info mb-0 orange">{'$' + this.state.earnings.month}</h5>
					</div>

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="earnings-title">YTD: </h5>
						<h5 className="info mb-0 orange">{'$' + this.state.earnings.year}</h5>
					</div>

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="earnings-title">All Time: </h5>
						<h5 className="info mb-0 orange">{'$' + this.state.earnings.total}</h5>
					</div>
				</div>
			</div>
		);
	}
}

export default Earnings;