import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import NavbarTop from '../NavbarTop';
// import axios from 'axios';

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
			console.log(response);
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
					<div className="row">
						<div className="earnings-info col-md-12">
							<h4 className="earnings-title">7 Days: </h4>
							<h4 className="info mb-0 orange">{'$' + this.state.earnings.week}</h4>
						</div>

						<div className="lesson-info col-md-12">
							<h4 className="earnings-title">30 Days: </h4>
							<h4 className="info mb-0 orange">{'$' + this.state.earnings.month}</h4>
						</div>

						<div className="lesson-info col-md-12">
							<h4 className="earnings-title">YTD: </h4>
							<h4 className="info mb-0 orange">{'$' + this.state.earnings.year}</h4>
						</div>

						<div className="lesson-info col-md-12">
							<h4 className="earnings-title">All Time: </h4>
							<h4 className="info mb-0 orange">{'$' + this.state.earnings.total}</h4>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Earnings;