import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarTop from '../NavbarTop';
import moment from 'moment';

class Lessons extends Component {

	constructor(props) {
		super(props);
		this.state = {
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
		var url;
		switch (event.target.id) {
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
			this.setState({lessons});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	render() {
		
		const allLessons = this.state.lessons.map((lesson) =>
				<div className="lesson-summary" key={lesson.id}>
					<Link to={'lesson/' + lesson.id}>
						<h5 className="font-weight-bold">{ this.handleDate(lesson.start_time) }</h5>
						<h5 className="mb-1">{lesson.first_name} {lesson.last_name}</h5>
						<h6 className="mb-0">{ this.handleTime(lesson.start_time) } - { this.handleTime(lesson.end_time) }</h6>
						{lesson.payment > 0 ? <h6 className="mb-0 mt-1 orange">${lesson.payment}</h6> : null }
					</Link>
				</div>
			
		)

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
							<div className="lesson-btn orange" id="upcoming" onClick={this.handleClick}>Upcoming</div>

							<div className="lesson-btn orange" id="unsubmitted" onClick={this.handleClick}>Unsubmitted</div>

							<div className="lesson-btn orange" id="submitted" onClick={this.handleClick}>Submitted</div>
					</div>

					{ allLessons }
				</div>
			</div>
		);
	}
}

export default Lessons;