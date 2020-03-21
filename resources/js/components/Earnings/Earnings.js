import React, { Component } from 'react';
import NavbarTop from '../NavbarTop';
import axios from 'axios';
import EarningsChart from './EarningsChart';

class Earnings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			earnings: [],
			year: new Date().getFullYear()
		};
	}

	prevMonth() {
		let year = this.state.year - 1;
		this.setState({ year });
		this.getChartData(year);
	}

	nextMonth() {
		let year = this.state.year + 1;
		this.setState({ year });
		this.getChartData(year);
	}

	getChartData(year) {
		const url = '/api/earnings/' + year;
		axios.get(url
		)
			.then((response) => {
				var earnings = response.data;
				this.setState({ earnings });
			})
			.catch((error) => {
				console.log(error)
			});
	}

	componentDidMount() {
		this.getChartData(this.state.year);
	}

	render() {

		return (
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
						<h5 className="d-flex info mb-0 orange">{'$' + this.state.earnings.week}</h5>
					</div>

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="earnings-title">30 Days: </h5>
						<h5 className="d-flex info mb-0 orange">{'$' + this.state.earnings.month}</h5>
					</div>

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="earnings-title">YTD: </h5>
						<h5 className="d-flex info mb-0 orange">{'$' + this.state.earnings.year}</h5>
					</div>

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="earnings-title">All Time: </h5>
						<h5 className="d-flex info mb-0 orange">{'$' + this.state.earnings.total}</h5>
					</div>

					<div className="d-flex justify-content-center pt-3">
						{this.state.earnings.monthly ? (
							<EarningsChart monthly={this.state.earnings.monthly} year={this.state.year} />
						) : null}
					</div>
					<div className="text-center earnings-year">
						<span className="pointer" onClick={this.prevMonth.bind(this)}>&lt; </span>
						Monthly Earnings {this.state.year}
						<span className="pointer" onClick={this.nextMonth.bind(this)}> &gt;</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Earnings;