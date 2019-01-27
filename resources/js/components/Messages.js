import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Messages extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages: []
		};
	}

	// componentDidMount() {
	// 	axios.get('/messages'
	// 	)
	// 	.then((response) => {
	// 		var messages = response.data;
	// 		this.setState({messages});
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	});
	// }

	render() {

		// const allMessages = this.state.messages.map((lesson) =>
			
		// 		<div className="lesson-summary" key={lesson.id}>
		// 			<Link to={'lesson/' + lesson.id}>
		// 				<h4 className="font-weight-bold mb-1">{lesson.first_name}</h4>
		// 				<h6>{lesson.city}, {lesson.state} {lesson.zip}</h6>
		// 			</Link>
		// 		</div>
			
		// )

		return(
			<div className="content-container">
				<h2 className="font-weight-bold">Messages</h2>
				{/* { allMessages } */}
			</div>
		);
	}
}

export default Messages;