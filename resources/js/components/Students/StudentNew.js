import React, { Component } from 'react';
import Axios from 'axios';
import NavbarTop from '../NavbarTop';

class StudentNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			rate: '',
			phone: '',
			email: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		Axios.post('/api/student', {
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			rate: Math.trunc(Number(this.state.rate)),
			phone: this.state.phone,
			email: this.state.email
		})
		.then((response) => {
			if (response.request.status === 201) {
				this.props.history.push('/home');
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
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="fas fa-times orange" linkLeft="/home" linkRight="/home" title="Add Student" />
				
				<div className="container content-container">
					<form className="pt-2" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="firstName">First Name:</label>
							<input type="text" className="form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} autoFocus required />
						</div>

						<div className="form-group">
							<label htmlFor="lastName">Last Name:</label>
							<input type="text" className="form-control" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="rate">Hourly Rate:</label>{rateError ? <span className="text-danger"> Please enter a reasonable hourly rate</span> : ''}
							<input type="number" className={`form-control ${ rateError ? 'error' : ''}`} id="rate" name="rate" value={this.state.rate.length > 0 ? Math.trunc(Number(this.state.rate)) : ''} onChange={this.handleInputChange} required/>
						</div>

						<div className="form-group">
							<label htmlFor="phone">Phone:</label>{phoneError ? <span className="text-danger"> Enter a valid 10 digit phone number</span> : ''}
							<input type="text" className={`form-control ${ phoneError ? 'error' : ''}`} id="phone" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInputChange}/>
						</div>

						<button type="submit" className="btn btn-primary mb-5"  disabled={disableBtn ? true : false} >Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default StudentNew;