import React, { Component } from 'react';
import Axios from 'axios';
import NavbarTop from './NavbarTop';

class StudentEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
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

	componentDidMount() {
		var url = '/student/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			var student = response.data[0];
			this.setState({
				first_name: student.first_name ? student.first_name : '',
				last_name: student.last_name ? student.last_name : '',
				phone: student.phone ? student.phone : '',
				email: student.email ? student.email : '',
				street: student.street ? student.street : '',
				city: student.city ? student.city : '',
				state: student.state ? student.state : '',
				zip: student.zip ? student.zip : ''
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
		let url = '/student/' + this.props.match.params.id;
		Axios.put(url, {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			phone: this.state.phone,
			email: this.state.email,
			street: this.state.street,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip
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
			const stateError = this.state.state.length > 2 || this.state.state.length === 1;
			const isValidZip = (/^\d{5}(-\d{4})?(?!-)$/).test(this.state.zip);
			const zipError = !isValidZip && this.state.zip.length > 0;
			const isValidPhone = (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/).test(this.state.phone);
			const phoneError = !isValidPhone && this.state.phone.length > 0;
			const disableBtn = stateError || zipError || phoneError;

		return (
			<div className="row">
				<NavbarTop iconClass="fas fa-plus orange" linkLeft="/settings" linkRight="/student/new" title="Edit Student" />
				
				<div className="container content-container pt-2">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="first_name">First Name:</label>
							<input type="text" className="form-control" id="first_name" name="first_name" value={this.state.first_name ? this.state.first_name : ''} onChange={this.handleInputChange} required />
						</div>

						<div className="form-group">
							<label htmlFor="last_name">Last Name:</label>
							<input type="text" className="form-control" id="last_name" name="last_name" value={this.state.last_name ? this.state.last_name : ''} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="phone">Phone:</label>{phoneError ? <span className="text-danger"> Enter a valid 10 digit phone number</span> : ''}
							<input type="text" className={`form-control ${ phoneError ? 'error' : ''}`} id="phone" name="phone" value={this.state.phone ? this.state.phone : ''} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" className="form-control" id="email" name="email" value={this.state.email ? this.state.email : ''} onChange={this.handleInputChange}/>
						</div>

						<div className="form-group">
							<label htmlFor="street">Street:</label>
							<input type="text" className="form-control" id="street" name="street" value={this.state.street ? this.state.street : ''} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="city">City:</label>
							<input type="text" className="form-control" id="city" name="city" value={this.state.city ? this.state.city : ''} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="state">State: </label>{stateError ? <span className="text-danger"> Please use the state's two letter abbreviation</span> : ''}
							<input type="text" className={`form-control ${ stateError ? 'error' : ''}`} id="state" name="state" value={this.state.state ? this.state.state.toUpperCase() : ''} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="zip">Zip:</label>{zipError ? <span className="text-danger"> Valid formats are xxxxx or xxxxx-xxxx</span> : ''}
							<input type="text" className={`form-control ${ zipError ? 'error' : ''}`} id="zip" name="zip" value={this.state.zip ? this.state.zip : ''} onChange={this.handleInputChange} />
						</div>

						<button type="submit" className="btn btn-primary mb-5"  disabled={disableBtn ? true : false} >Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default StudentEdit;