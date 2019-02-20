import React, { Component } from 'react';
import Axios from 'axios';
import NavbarTop from '../NavbarTop';

class StudentEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			rate: '',
			phone: '',
			email: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		var url = '/api/student/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			var student = response.data;
			this.setState({
				first_name: student.first_name ? student.first_name : '',
				last_name: student.last_name ? student.last_name : '',
				rate: student.rate ? student.rate : '',
				phone: student.phone ? student.phone : '',
				email: student.email ? student.email : ''
			});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	handleInputChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSubmit(event) {
		event.preventDefault();
		let url = '/api/student/' + this.props.match.params.id;
		Axios.put(url, {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			rate: Math.trunc(Number(this.state.rate)),
			phone: this.state.phone,
			email: this.state.email
		})
		.then((response) => {
			if (response.request.status === 200) {
				let url = '/student/' + response.data;
				this.props.history.push(url);
			}
			else {
				alert('There was a problem saving the data. Please check your entries and try again.')
			}
		})
		.catch((error) => {
			alert('An error occurred. Please check your entries and try again.');
			console.log(error);
		})
	  }

	render() {
		const rateError = this.state.rate > 1000;
		const isValidPhone = (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/).test(this.state.phone);
		const phoneError = !isValidPhone && this.state.phone.length > 0;
		const disableBtn = rateError || phoneError;

		return (
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="fas fa-times orange" linkLeft={`/student/${this.props.match.params.id}`} linkRight={`/student/${this.props.match.params.id}`} title="Edit Student" />
				
				<div className="container content-container">
					<form className="pt-2" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="first_name">First Name:</label>
							<input type="text" className="form-control" id="first_name" name="first_name" value={this.state.first_name ? this.state.first_name : ''} onChange={this.handleInputChange} required />
						</div>

						<div className="form-group">
							<label htmlFor="last_name">Last Name:</label>
							<input type="text" className="form-control" id="last_name" name="last_name" value={this.state.last_name ? this.state.last_name : ''} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="rate">Hourly Rate:</label>{rateError ? <span className="text-danger"> Please enter a reasonable hourly rate</span> : ''}
							<input type="number" className={`form-control ${ rateError ? 'error' : ''}`} id="rate" name="rate" value={this.state.rate ? Math.trunc(Number(this.state.rate)) : ''} onChange={this.handleInputChange} required/>
						</div>

						<div className="form-group">
							<label htmlFor="phone">Phone:</label>{phoneError ? <span className="text-danger"> Enter a valid 10 digit phone number</span> : ''}
							<input type="text" className={`form-control ${ phoneError ? 'error' : ''}`} id="phone" name="phone" value={this.state.phone ? this.state.phone : ''} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" className="form-control" id="email" name="email" value={this.state.email ? this.state.email : ''} onChange={this.handleInputChange}/>
						</div>

						<button type="submit" className="btn btn-primary mb-5"  disabled={disableBtn ? true : false} >Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default StudentEdit;