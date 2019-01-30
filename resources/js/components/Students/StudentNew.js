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
			email: '',
			street: '',
			city: '',
			state: '',
			zip: ''
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
		Axios.post('/student', {
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			rate: Math.trunc(Number(this.state.rate)),
			phone: this.state.phone,
			email: this.state.email,
			street: this.state.street,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip
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
		const stateError = this.state.state.length > 2 || this.state.state.length === 1;
		const isValidZip = (/^\d{5}(-\d{4})?(?!-)$/).test(this.state.zip);
		const zipError = !isValidZip && this.state.zip.length > 0;
		const isValidPhone = (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/).test(this.state.phone);
		const phoneError = !isValidPhone && this.state.phone.length > 0;
		const disableBtn = rateError || stateError || zipError || phoneError;

		return (
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" linkLeft="/home" linkRight="" title="Add Student" />
				
				<div className="container content-container pt-2">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="firstName">First Name:</label>
							<input type="text" className="form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} required />
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

						<div className="form-group">
							<label htmlFor="street">Street:</label>
							<input type="text" className="form-control" id="street" name="street" value={this.state.street} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="city">City:</label>
							<input type="text" className="form-control" id="city" name="city" value={this.state.city} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="state">State: </label>{stateError ? <span className="text-danger"> Please use the state's two letter abbreviation</span> : ''}
							<input type="text" className={`form-control ${ stateError ? 'error' : ''}`} id="state" name="state" value={this.state.state.toUpperCase()} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="zip">Zip:</label>{zipError ? <span className="text-danger"> Valid formats are xxxxx or xxxxx-xxxx</span> : ''}
							<input type="text" className={`form-control ${ zipError ? 'error' : ''}`} id="zip" name="zip" value={this.state.zip} onChange={this.handleInputChange} />
						</div>

						<button type="submit" className="btn btn-primary mb-5"  disabled={disableBtn ? true : false} >Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default StudentNew;