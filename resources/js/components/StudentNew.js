import React, { Component } from 'react';
import NavbarTop from './NavbarTop';
import Axios from 'axios';

class StudentNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
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
			phone: this.state.phone,
			email: this.state.email,
			street: this.state.street,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip
		})
		.then((response) => {
			if (response.request.status === 201) {
				alert('success');
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

		return (
			<div className="row">
				<NavbarTop iconClass="fas fa-plus orange" linkLeft="/settings" linkRight="/student/new" title="Add Student" />
				
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
							<label htmlFor="phone">Phone:</label>
							<input type="text" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
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
							<label htmlFor="state">State:</label>
							<input type="text" className="form-control" id="state" name="state" value={this.state.state} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="zip">Zip:</label>
							<input type="text" className="form-control" id="zip" name="zip" value={this.state.zip} onChange={this.handleInputChange} />
						</div>

						<button type="submit" className="btn btn-default">Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default StudentNew;