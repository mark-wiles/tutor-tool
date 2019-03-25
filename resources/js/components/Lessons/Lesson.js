import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Icon from '../Icon';
import NavbarTop from '../NavbarTop';

class Lesson extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lesson: [],
			location: null
		};
	}

	componentDidMount() {
		var url = '/api/lesson/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			this.setState(
				{
					lesson: response.data,
					location: response.data.location
				}
			);
		})
		.catch((error) => {
			console.log(error)
		});
	}

	handleAddressClick() {
		var id = '#address-options' + event.target.dataset.id;
		$(id).toggleClass('hidden');
	}

	handleDate(date) {
		if (date) {
			var theDate = new Date(date.replace(/-/g, '/'));
			theDate = moment(theDate).format('ddd, MMM D YYYY');
			return theDate;
		}
	}

	handleTime(time) {
		if (time) {
			var theTime = new Date(time.replace(/-/g, '/'));
			theTime = moment(theTime.getTime()).format('h:mm A');
			return theTime;
		}
	}

	render() {
		const lesson = this.state.lesson;
		const address = this.state.location;

		return(
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="fas fa-edit orange" linkLeft="/lessons" linkRight={`/lesson/edit/${lesson.id}`} title={lesson.first_name} />

				<div className="container content-container">
					<div className="lesson-icons row">
						<a className={!lesson.email ? "disabled-link" : ""} href={`mailto:${lesson.email}`} target="_blank">
							<Icon className="far fa-envelope" title="Email" />
						</a>
						<a className={!lesson.phone ? "disabled-link" : ""} href={`tel:${lesson.phone}`}>
							<Icon className="fas fa-mobile-alt" title="Call" />
						</a>
						<a className={!lesson.phone ? "disabled-link" : ""} href={`sms:${lesson.phone}`}>
							<Icon className="far fa-comment" title="Text" />
						</a>
					</div>

					<div className="row p-0">
						<div className="col-md-12 p-0">
							<h5 className="info-header"><b>Info</b></h5>
						</div>
					</div>

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="info-title">Name</h5>
						<h5 className="info">{lesson.first_name} {lesson.last_name}</h5>
					</div>

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="info-title">Date</h5>
						<h5 className="info">{this.handleDate(lesson.start_time)}</h5>
					</div>

					{lesson.subject ? 
					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="info-title">Subject</h5>
						<h5 className="info">{lesson.subject}</h5>
					</div>
					: null }

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="info-title">Hourly Rate</h5>
						<h5 className="info">{`$${lesson.rate}`}</h5>
					</div>

					<div className="d-flex justify-content-between bb-1-s">
						<h5 className="info-title">Start Time</h5>
						<h5 className="info">{this.handleTime(lesson.start_time)}</h5>
					</div>

					<div className="d-flex justify-content-between">
						<h5 className="info-title">End Time</h5>
						<h5 className="info">{this.handleTime(lesson.end_time)}</h5>
					</div>

					{ address ?
					<div className="row">
						<div className="col-md-12 p-0">
							<h5 className="info-header"><b>Location</b></h5>

							<div className="container">
								<div className="pb-2 pt-2 pointer" data-id={address.id} key={address.id} onClick={this.handleAddressClick}>
									<h5 className="m-0" data-id={address.id}>{address.venue}</h5>
									<h5 className="m-0" data-id={address.id}>{address.street}</h5>
									<h5 className="m-0" data-id={address.id}>{address.city ? address.city + ', ' : ''}{address.state}</h5>
									<h5 className="m-0" data-id={address.id}>{address.zip}</h5>

									<div className="address-options hidden" id={'address-options' + address.id}>
										<a href={`https://www.google.com/maps/place/${address.street}+${address.city}+${address.state}+${address.zip}`} target="_blank">
											<h5 className="orange">Show on Map</h5>
										</a>
									</div>
								</div>
							</div>
						</div>	
					</div>
					: null }

					<div className="row">
						<div className="col-md-12 p-0">
							<h5 className="info-header"><b>Status</b></h5>
								<div className="container">

								{lesson.payment > 0 ? 
									<h5 className="info orange">{`Paid: $${lesson.payment}`}</h5>
								:
									<h5 className="info-title orange">Unsubmitted</h5>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Lesson;