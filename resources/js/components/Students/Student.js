import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Icon from '../Icon';
import NavbarTop from '../NavbarTop';

class Student extends Component {

	constructor(props) {
		super(props);
		this.state = {
			student: []
		};
		this.handleAddressClick = this.handleAddressClick.bind(this);
	}

	componentDidMount() {
		var url = '/api/student/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			var student = response.data;
			this.setState({student});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	handleAddressClick() {
		var id = '#address-options' + event.target.dataset.id;
		$(id).toggleClass('hidden');
	}

	render() {
		const student = this.state.student;
		
		const addresses = student.addresses ? (student.addresses.map((address) =>			
				<div className="address-summary" data-id={address.id} key={address.id} onClick={this.handleAddressClick}>
					<h6 className="m-0" data-id={address.id}>{address.venue}</h6>
					<h6 className="m-0" data-id={address.id}>{address.street}</h6>
					<h6 className="m-0" data-id={address.id}>{address.city}, {address.state}</h6>
					<h6 className="m-0" data-id={address.id}>{address.zip}</h6>
				
					<div className="address-options hidden" id={'address-options' + address.id}>
						<a href={`https://www.google.com/maps/place/${address.street}+${address.city}+${address.state}+${address.zip}`} target="_blank">
							<h5 className="orange">Show on Map</h5>
						</a>

						<Link to={'/address/edit/' + address.id}>
							<h5 className="orange">Edit</h5>
						</Link>
					</div>
				</div>
		)) : null

		const notes = student.notes ? (student.notes.map((note) =>
			<div className="note-summary" key={note.id}>
				<h6 className="m-0">{note.note}</h6>
			</div>
		)) : null
		

		return(
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="fas fa-edit orange" linkLeft="/home" linkRight={`/student/edit/${student.id}`} title={student.first_name} />

				<div className="container content-container">
					<div className="student-icons row">
						<a className={!student.email ? "disabled-link" : ""} href={`mailto:${student.email}`} target="_blank">
							<Icon className="far fa-envelope" title="Email" />
						</a>
						<a className={!student.phone ? "disabled-link" : ""} href={`tel:${student.phone}`}>
							<Icon className="fas fa-mobile-alt" title="Call" />
						</a>
						<Link to="/lesson/new">
							<Icon className="far fa-calendar-plus" title="Lesson" />
						</Link>
					</div>

					<div className="row">
						<div className="col-md-12 p-0">
							<h5 className="info-title info-header"><b>Info</b></h5>
						</div>
						
						<div className="container">
							<div className="student-info">
								<h5 className="info-title">Name</h5>
								<h5 className="info">{student.first_name} {student.last_name}</h5>
							</div>

							<div className="student-info">
								<h5 className="info-title">Hourly Rate</h5>
								<h5 className="info">{`$${student.rate}`}</h5>
							</div>

							<div className="student-info">
								<h5 className="info-title">Phone</h5>
								<h5 className="info">{student.phone}</h5>
							</div>

							<div className="student-info">
								<h5 className="info-title">Email</h5>
								<h5 className="info">{student.email}</h5>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12 p-0">
							<h5 className="info-header info-title"><b>Address</b></h5>

							<div className="container">

								{ addresses }

								<Link to={'/address/new/' + student.id}>
									<h5 className="info-title orange pt-2">Add Address</h5>
								</Link>
							</div>
						</div>	
					</div>
					

					<div className="row">
						<div className="col-md-12 p-0">
							<h5 className="info-title info-header"><b>Notes</b></h5>

							<div className="container notes">

								{ notes }

								<Link to={'/note/new/' + student.id}>
									<h5 className="info-title orange pt-2">Add Note</h5>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Student;