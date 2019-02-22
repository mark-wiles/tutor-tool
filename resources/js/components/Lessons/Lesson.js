import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import NavbarTop from '../NavbarTop';

class Lesson extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lesson: []
		};
	}

	componentDidMount() {
		var url = '/api/lesson/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			var lesson = response.data[0];
			this.setState({lesson});
		})
		.catch((error) => {
			console.log(error)
		});
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
		var lesson = this.state.lesson;

		return(
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="fas fa-edit orange" linkLeft="/lessons" linkRight={`/lesson/edit/${lesson.id}`} title={lesson.first_name} />

				<div className="container content-container">
					<div className="lesson-info">
						<h5 className="info-title">Name</h5>
						<h5 className="info">{lesson.first_name} {lesson.last_name}</h5>
					</div>

					<div className="lesson-info">
						<h5 className="info-title">Date</h5>
						<h5 className="info">{this.handleDate(lesson.start_time)}</h5>
					</div>

					<div className="lesson-info">
						<h5 className="info-title">Subject</h5>
						<h5 className="info">{lesson.subject}</h5>
					</div>

					<div className="lesson-info">
						<h5 className="info-title">Hourly Rate</h5>
						<h5 className="info">{`$${lesson.rate}`}</h5>
					</div>

					<div className="lesson-info">
						<h5 className="info-title">Start Time</h5>
						<h5 className="info">{this.handleTime(lesson.start_time)}</h5>
					</div>

					<div className="lesson-info">
						<h5 className="info-title">End Time</h5>
						<h5 className="info">{this.handleTime(lesson.end_time)}</h5>
					</div>

					{lesson.payment > 0 ? 
						<div className="lesson-info">
							<h5 className="info-title orange">Paid</h5>
							<h5 className="info orange">{`$${lesson.payment}`}</h5>
						</div>
						:
						<div className="lesson-info">
							<h5 className="info-title orange">Unsubmitted</h5>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default Lesson;