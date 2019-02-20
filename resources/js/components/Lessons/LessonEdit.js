import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';
import NavbarTop from '../NavbarTop';

class LessonEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lesson: [],
			payment: '',
			rate: '',
			subject: '',
			start_date: '',
			end_date: '',
			start_time: '',
			end_time: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handlePayment = this.handlePayment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		var url = '/api/lesson/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			var lesson = response.data[0];
			var start_date = new Date(lesson.start_time);
			var end_date = new Date(lesson.end_time);
			var start_time = moment(start_date).format('HH:mm');
			var end_time = moment(end_date).format('HH:mm');
			start_date = moment(start_date).format('YYYY-MM-DD');
			end_date = moment(end_date).format('YYYY-MM-DD');

			this.setState(
				{
					lesson: lesson,
					start_date: start_date,
					end_date: end_date,
					start_time: start_time,
					end_time: end_time,
					payment: lesson.payment,
					rate: lesson.rate,
					subject: lesson.subject,
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

	handlePayment(event) {
		const name = event.target.name;
		const value = Number(event.target.value).toFixed(2);
		this.setState({
			[name]: value
		});
	};

	handleSubmit(event) {
		event.preventDefault();
		var startTime = this.state.start_date + ' ' + this.state.start_time;
		var endTime = this.state.end_date + ' ' + this.state.end_time;
		var unixTime = new Date(startTime);
		unixTime = unixTime.getTime();
		var url = '/api/lesson/' + this.props.match.params.id;

		Axios.put(url, {
			start_time: startTime,
			end_time: endTime,
			unix_time: Math.round(unixTime/1000),
			rate: Math.trunc(Number(this.state.rate)),
			subject: this.state.subject,
			student_id: parseInt(this.state.lesson.student_id),
			payment: Number(Number(this.state.payment).toFixed(2))
		})
		.then((response) => {
			if (response.request.status === 200) {
				this.props.history.push('/lessons');
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
		const lesson = this.state.lesson;
		const currentTime = new Date();
		const lessonTime = new Date(this.state.end_date + ' ' + this.state.end_time);
		const isPast = lessonTime.getTime() < currentTime.getTime();
		const dateError = new Date(this.state.start_date) > new Date(this.state.end_date);
		const timeError = new Date(this.state.start_date).getDate() === new Date(this.state.end_date).getDate() && this.state.start_time >= this.state.end_time;
		const rateError = parseInt(this.state.rate) > 1000;
		const subjectError = this.state.subject ? this.state.subject.length > 40 : '';
		const paymentError = this.state.payment.length > 6;
		const disableBtn = rateError || dateError || subjectError || timeError;

		return (
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="fas fa-times orange" linkLeft={`/lesson/${this.props.match.params.id}`} linkRight={`/lesson/${this.props.match.params.id}`} title="Edit Lesson" />
				
				<div className="container content-container">
					<h3 className="pt-2">{lesson.first_name} {lesson.last_name}</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="rate">Hourly Rate:</label>{rateError ? <span className="text-danger"> Please enter a reasonable hourly rate</span> : ''}
							<input type="number" className={`form-control ${ rateError ? 'error' : ''}`} id="rate" name="rate" value={this.state.rate} onChange={this.handleInputChange} required/>
						</div>

						<div className="form-group">
							<label htmlFor="subject">Subject:</label>{subjectError ? <span className="text-danger"> Must be less than 40 characters</span> : ''}
							<input type="text" className={`form-control ${ subjectError ? 'error' : ''}`} id="subject" name="subject" value={this.state.subject ? this.state.subject : ''} onChange={this.handleInputChange}/>
						</div>

						<div className="date-time form-group">
							<label htmlFor="start_date">Date:</label>
							<input type="date" className="form-control" value={this.state.start_date} id="start_date" name="start_date" onChange={this.handleInputChange} required/>
						</div>

						<div className="date-time form-group">
							<label htmlFor="start_time">Start:</label>
							<input type="time" className="form-control" value={this.state.start_time} id="start_time" name="start_time" onChange={this.handleInputChange} pattern="[0-9]{2}:[0-9]{2}" required/>
						</div>

						<div className="date-time form-group">
							<label htmlFor="end_date">Date:</label> {dateError ? <span className="text-danger"> May not be earlier than start date.</span> : ""}
							<input type="date" className={`form-control ${ dateError ? 'error' : ''}`} value={this.state.end_date} id="end_date" name="end_date" onChange={this.handleInputChange} required/>
						</div>

						<div className="date-time form-group">
							<label htmlFor="end_time">End:</label>
							<input type="time" className={`form-control ${ timeError ? 'error' : ''}`} value={this.state.end_time} id="end_time" name="end_time" onChange={this.handleInputChange} pattern="[0-9]{2}:[0-9]{2}" required/>
						</div>

						{isPast ?
						<div className="form-group">
							<label className="orange" htmlFor="payment">Payment recieved</label>{paymentError ? <span className="text-danger"> Payment seems high. Please check.</span> : ""}
							<input type="number" className={`form-control ${ paymentError ? 'error' : ''}`} id="payment" name="payment" step=".01" value={this.state.payment} onChange={this.handlePayment} required/>
						</div>
						: null
						}

						<button type="submit" className="btn btn-primary mb-5"  disabled={disableBtn ? true : false} >Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default LessonEdit;