import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Lessons extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lessons: []
		};
	}

	// componentDidMount() {
	// 	axios.get('/lessons'
	// 	)
	// 	.then((response) => {
	// 		var lessons = response.data;
	// 		this.setState({lessons});
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	});
	// }

	render() {

		// const allLessons = this.state.lessons.map((lesson) =>
			
		// 		<div className="lesson-summary" key={lesson.id}>
		// 			<Link to={'lesson/' + lesson.id}>
		// 				<h4 className="font-weight-bold mb-1">{lesson.first_name}</h4>
		// 				<h6>{lesson.city}, {lesson.state} {lesson.zip}</h6>
		// 			</Link>
		// 		</div>
			
		// )

		return(
			<div className="content-container">
				<h2 className="font-weight-bold">Lessons</h2>
				{/* { allLessons } */}
			</div>
		);
	}
}

export default Lessons;