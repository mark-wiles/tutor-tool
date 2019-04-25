import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarTop from '../NavbarTop';
import moment from 'moment';

class Lessons extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeBtn: 'upcoming',
			moment: moment().format("MM-DD-YYYY"),
			lessons: []
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		axios.get('/api/lessons'
		)
		.then((response) => {
			let lessons = response.data;
			this.setState({lessons});
		})
		.catch((error) => {
			console.log(error);
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

	handleClick() {
		event.preventDefault();
		var btnId = event.target.id;
		var url;
		switch (btnId) {
			case 'unsubmitted':
				url = '/api/lessons/unsubmitted';
				break;
			case 'submitted':
				url = '/api/lessons/submitted';
				break;
			default:
				url = '/api/lessons';
		}
		axios.get(url
		)
		.then((response) => {
			var lessons = response.data;
			this.setState({
				activeBtn: btnId,
				lessons: lessons
			});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	render() {
		const upcoming = this.state.activeBtn === 'upcoming' ? 'b-1-orange' : '';

		const unsubmitted = this.state.activeBtn === 'unsubmitted' ? 'b-1-orange' : '';

		const submitted = this.state.activeBtn === 'submitted' ? 'b-1-orange' : '';
		
		const allLessons = this.state.lessons.map((lesson) =>
			<div className="summary" key={lesson.id}>
				<Link to={'lesson/' + lesson.id}>
					<h5 className="font-weight-bold">{ this.handleDate(lesson.start_time) }</h5>
					<h5 className="mb-1">{lesson.first_name} {lesson.last_name}</h5>
					<h6 className="mb-0">{ this.handleTime(lesson.start_time) } - { this.handleTime(lesson.end_time) }</h6>
					{ Number(lesson.payment) > 0 ? <h6 className="mb-0 mt-1 orange">{'$' + lesson.payment}</h6> : null }
				</Link>
			</div>
		);

		const noSubmitted = this.state.activeBtn === 'submitted' && allLessons.length === 0 ? <h5 className="orange pb-2 pt-2">No Submissions Yet!</h5> : '';

		const noUnsubmitted = this.state.activeBtn === 'unsubmitted' && allLessons.length === 0 ? <h5 className="orange pb-2 pt-2">All Caught Up!</h5> : noSubmitted;

		const lessonMessage = this.state.activeBtn === 'upcoming' ? 
			<Link to='/lesson/new'>
				<h5 className="orange pb-2 pt-2">Add Lesson</h5>
			</Link> : noUnsubmitted

		return(
			<div className="row">
				<NavbarTop 
					classLeft="fas fa-arrow-left orange"
					classRight="fas fa-plus orange"
					linkLeft="/home"
					linkRight="/lesson/new"
					title="Lessons"
				/>
				
				<div className="container content-container">

					<div className="lesson-buttons row">
							<div className={"lesson-btn orange pl-1 pr-1 " + upcoming} id="upcoming" onClick={this.handleClick}>Upcoming</div>

							<div className={"lesson-btn orange pl-1 pr-1 " + unsubmitted} id="unsubmitted" onClick={this.handleClick}>Unsubmitted</div>

							<div className={"lesson-btn orange pl-1 pr-1 " + submitted} id="submitted" onClick={this.handleClick}>Submitted</div>
					</div>

					{ allLessons }

					{ lessonMessage }

				</div>
			</div>
		);
	}
}

export default Lessons;