import React, { Component } from 'react';
import Axios from 'axios';
import NavbarTop from '../NavbarTop';

class AddressEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			venue: '',
			street: '',
			city: '',
			state: '',
			zip: '',
			student_id: ''
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		var url = '/api/address/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			var address = response.data;
			this.setState({
				venue: address.venue ? address.venue : '',
				street: address.street ? address.street : '',
				city: address.city ? address.city : '',
				state: address.state ? address.state : '',
				zip: address.zip ? address.zip : '',
				student_id: address.student_id ? address.student_id : ''
			});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	handleDelete() {
		var confirmed = confirm('Are you sure you would like to delete the address? This action cannot be undone.');
		if (confirmed) {
			let url = '/api/address/' + this.props.match.params.id;
			axios.delete(url
			)
			.then((response) => {
				if (response.request.status === 200) {
					let url = '/student/' + this.state.student_id;
					this.props.history.push(url);
				}
				else {
					alert('A problem occurred. Please try again later.');
				}
			})
			.catch((error)=> {
				console.log(error);
			})
		}
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
		let url = '/api/address/' + this.props.match.params.id;
		Axios.put(url, {
			venue: this.state.venue,
			street: this.state.street,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip
		})
		.then((response) => {
			if (response.request.status === 200) {
				let url = '/student/' + this.state.student_id;
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
		const cityError = this.state.city.length > 255;
		const stateError = this.state.state.length > 2 || this.state.state.length === 1;
		const streetError = this.state.street.length > 255;
		const venueError = this.state.venue.length > 50;
		const isValidZip = (/^\d{5}(-\d{4})?(?!-)$/).test(this.state.zip);
		const zipError = !isValidZip && this.state.zip.length > 0;
		const disableBtn = cityError || stateError || venueError || zipError;

		return (
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" linkLeft={`/student/${this.state.student_id}`} classRight="fas fa-times orange" linkRight={`/student/${this.state.student_id}`} title="Edit Address" />
				
				<div className="container content-container">
					<form className="pt-2" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="venue">Venu:</label>{venueError ? <span className="text-danger"> Location name is too long</span> : ''}
							<input type="text" className={`form-control ${ venueError ? 'error' : ''}`} id="venue" name="venue" placeholder="Ex: Starbucks" value={this.state.venue} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="street">Street:</label>{streetError ? <span className="text-danger"> Street Address is too long</span> : ''}
							<input type="text" className={`form-control ${ streetError ? 'error' : ''}`} id="street" name="street" value={this.state.street} onChange={this.handleInputChange} />
						</div>

						<div className="form-group">
							<label htmlFor="city">City:</label>{cityError ? <span className="text-danger"> City name is too long</span> : ''}
							<input type="text" className={`form-control ${ cityError ? 'error' : ''}`} id="city" name="city" value={this.state.city} onChange={this.handleInputChange} required />
						</div>

						<div className="form-group">
							<label htmlFor="state">State: </label>{stateError ? <span className="text-danger"> Please use the state's two letter abbreviation</span> : ''}
							<input type="text" className={`form-control ${ stateError ? 'error' : ''}`} id="state" name="state" value={this.state.state.toUpperCase()} onChange={this.handleInputChange} required />
						</div>

						<div className="form-group">
							<label htmlFor="zip">Zip:</label>{zipError ? <span className="text-danger"> Valid formats are xxxxx or xxxxx-xxxx</span> : ''}
							<input type="text" className={`form-control ${ zipError ? 'error' : ''}`} id="zip" name="zip" placeholder="xxxxx or xxxxx-xxxx" value={this.state.zip} onChange={this.handleInputChange} />
						</div>

						<button type="submit" className="btn btn-primary mb-5"  disabled={disableBtn ? true : false} >Submit</button>
					</form>

					<div className="row">
						<h6 className="col-md-12 text-center orange" onClick={this.handleDelete}>Delete Address</h6>
					</div>
				</div>
			</div>
		);
	}
}

export default AddressEdit;