import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class Student extends Component {

	constructor(props) {
		super(props);
		this.state = {
			student: []
		};
	}

	componentDidMount() {
		var url = '/student/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			var student = response.data[0];
			console.log('student', student);
			this.setState({student});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	render() {
		var student = this.state.student;

		return(
			<div className="content-container">
				<div className="student-info">
					<h5>{student.first_name} {student.last_name}</h5>
				</div>

				<div className="student-info">
					<h5>{student.phone}</h5>
				</div>

				<div className="student-info">
					<h5>{student.email}</h5>
				</div>

				<div className="student-info">
					<h5>{student.street}</h5>
					<h5>{student.city}, {student.state} {student.zip}</h5>
				</div>
			</div>
		);
	}
}

export default Student;