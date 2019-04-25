import React, { Component } from 'react';
import Axios from 'axios';
import NavbarTop from '../NavbarTop';
import moment from 'moment';
import AddressSelector from '../Addresses/AddressSelector';

class LessonNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addresses: [],
			students: [],
			start_date: '',
			end_date: '',
			start_time: '12:00',
			end_time: '13:00',
			rate: '',
			subject: '',
			location_id: null,
			student_id: null,
		};

		this.handleAddress = this.handleAddress.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleTime = this.handleTime.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		var date = new Date();
		var theDate = moment(date).format('YYYY-MM-DD');
		axios.get('/api/students'
		)
		.then((response) => {
			var students = response.data;
			if (students.length === 0) {
				alert('You do not have any active students yet. No problem, you can add one now.');
				this.props.history.push('/student/new');
			} else {
				this.setState(
					{
						students: students,
						start_date: theDate,
						end_date: theDate
					}
				);
			}
		})
		.catch((error) => {
			console.log(error)
		});
	}

	handleDate(event) {
		const value = event.target.value;
		this.setState({
			start_date: value,
			end_date: value
		})
	}

	handleTime(event) {
		let startTime = event.target.value;
		let dateTime = new Date(this.state.start_date.replace(/-/g, '/') + ' ' + startTime);
		let endTime = moment(dateTime.getTime() + (1000 * 60 * 60)).format('HH:mm');
		
		this.setState({
			start_time: startTime,
			end_time: endTime
		})
	}

	handleInputChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSelect(event) {
		const student_id = parseInt(event.target.value);
		const addresses = this.state.students.find(x => x.id === student_id).addresses;
		const rate = event.target.options[event.target.selectedIndex].dataset.rate;
		this.setState({
			student_id: student_id,
			rate: rate,
			addresses: addresses
		})
	}

	handleAddress(id) {
		this.setState({
			location_id: id
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		var startTime = this.state.start_date + ' ' + this.state.start_time;
		var endTime = this.state.end_date + ' ' + this.state.end_time;
		var unixTime = new Date(startTime.replace(/-/g, '/'));
		unixTime = unixTime.getTime();

		let data = {
			start_time: startTime,
			end_time: endTime,
			unix_time: Math.round(unixTime/1000),
			rate: Math.trunc(Number(this.state.rate)),
			subject: this.state.subject,
			student_id: parseInt(this.state.student_id),
			location_id: parseInt(this.state.location_id)
		}
		
		Axios.post('/api/lesson', data)
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
		const startDate = new Date(this.state.start_date.replace(/-/g, '/'));
		const endDate = new Date(this.state.end_date.replace(/-/g, '/'));
		const dateTime1 = new Date(this.state.start_date.replace(/-/g, '/') + ' ' + this.state.start_time);
		const dateTime2 = new Date(this.state.end_date.replace(/-/g, '/') + ' ' + this.state.end_time);
		const duration = Math.round(100 * Number(dateTime2.getTime() - dateTime1.getTime()) / (1000 * 60 * 60))/100;
		const payAmount = (this.state.rate * duration).toFixed(2);
		const dateError = startDate > endDate;
		const rateError = this.state.rate > 1000;
		const subjectError = this.state.subject.length > 40;
		const timeError = startDate.getDate() === endDate.getDate() && this.state.start_time >= this.state.end_time;
		const disableBtn = dateError || rateError || subjectError || timeError;

		const students = this.state.students.map((student) =>
			<option key={student.id} data-rate={student.rate} value={student.id}>{student.first_name} {student.last_name}</option>
		)

		return (
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="fas fa-times orange" linkLeft="/lessons" linkRight="/lessons" title="Add Lesson" />
				
				<div className="container content-container">
					<form className="pt-2" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="student_id">Student</label>

							<select
								className="form-control"
								id="student_id"
								name="student_id"
								onChange={this.handleSelect}
								required
							>
								<option value="">Select a Student</option>
								{ students }
							</select>
						</div>

						<div className="form-group">
							<label htmlFor="rate">Hourly Rate:</label>
							
							{rateError ? <span className="text-danger"> Please enter a reasonable hourly rate</span> : ''}
							
							<input
								type="number"
								className={`form-control ${ rateError ? 'error' : ''}`}
								id="rate"
								name="rate"
								value={this.state.rate}
								onChange={this.handleInputChange}
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="subject">Subject:</label>
							
							{subjectError ? <span className="text-danger"> Must be less than 40 characters</span> : ''}

							<input
								type="text"
								className={`form-control ${ subjectError ? 'error' : ''}`}
								id="subject"
								name="subject"
								value={this.state.subject}
								onChange={this.handleInputChange}
							/>
						</div>

						{this.state.student_id && this.state.addresses.length > 0 ? 
						<AddressSelector
							locationId={this.state.location_id}
							studentId={this.state.student_id}
							onSelectAddress={this.handleAddress}
						/>
						: null }

						<div>
							<h6>Start: <span className="pl-1">{moment(dateTime1).format('dddd, MMMM D, h:mm a')}</span></h6>
						</div>

						<div className="date-time form-group">
							<input
								type="date"
								className="form-control"
								defaultValue={this.state.start_date}
								id="start_date"
								name="start_date"
								onChange={this.handleDate}
								required
							/>
						</div>

						<div className="date-time form-group">
							<input
								type="time"
								className="form-control"
								defaultValue={this.state.start_time}
								id="start_time"
								name="start_time"
								onChange={this.handleTime}
								pattern="[0-9]{2}:[0-9]{2}"
								required
								step="300"
							/>
						</div>

						<div>
							<h6>End: <span className="pl-1">{moment(dateTime2).format('dddd, MMMM D, h:mm a')}</span></h6>
						</div>

						<div className="date-time form-group">
							<input
								type="date"
								className={`form-control ${ dateError ? 'error' : ''}`}
								defaultValue={this.state.start_date}
								id="end_date" min={this.state.start_date}
								name="end_date"
								onChange={this.handleInputChange}
								required
							/>
						</div>

						<div className="date-time form-group">
							<input
								type="time"
								className={`form-control ${ timeError ? 'error' : ''}`}
								value={this.state.end_time}
								id="end_time"
								name="end_time"
								onChange={this.handleInputChange}
								pattern="[0-9]{2}:[0-9]{2}"
								required
								step="300"
							/>
						</div>

						<div className="pb-2">
							<h6>Rate: ${this.state.rate}</h6>
							<h6>Duration: {isNaN(duration) ? '' : duration} {duration === 1 ? 'hour' : 'hours'}</h6>
							<h6>Lesson Total: ${isNaN(payAmount) ? '' : payAmount}</h6>
						</div>

						<button type="submit" className="btn bg-orange text-white mb-5"  disabled={disableBtn ? true : false} >Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default LessonNew;