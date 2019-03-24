import React, { Component } from 'react';
import Axios from 'axios';

class AddressSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addresses: []
		}
		this.handleAddressSelect = this.handleAddressSelect.bind(this);
	}

	componentDidMount() {
		let url = '/api/addresses/' + this.props.studentId;

		Axios.get(url)
		.then(response => {
			this.setState({
				addresses: response.data
			})
		})
		.catch(error => {
			console.log(error);
		})
	}

	handleAddressSelect(event) {
		let id = parseInt(event.target.value);
		this.props.onSelectAddress(id);
	}

	render() {
		const addresses = this.state.addresses.map(address => 
			<option key={address.id} value={address.id}>{address.venue}</option>
		);

		return(
			<div className="form-group">
				<label htmlFor="location">Location</label>

				<select
					className="form-control"
					id="location"
					name="location"
					onChange={this.handleAddressSelect}
					required
					value={this.props.locationId ? this.props.locationId : 'select'}
				>
					<option value="select">Select a Location</option>
					{addresses}
				</select>
			</div>
		)
	}
}

export default AddressSelector;
