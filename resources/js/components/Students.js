import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Students extends Component {

	constructor(props) {
		super(props);
		this.state = {
			students: []
		};
	}

	componentDidMount() {
		axios.get('/students'
		)
		.then((response) => {
			var students = response.data;
			this.setState({students});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	render() {

		const allStudents = this.state.students.map((student) =>
			
				<div className="student-summary" key={student.id}>
					<Link to={'/student/' + student.id}>
						<h4 className="font-weight-bold mb-1">{student.first_name}</h4>
						<h6>{student.city}, {student.state} {student.zip}</h6>
					</Link>
				</div>
		)

		return (
			<div className="content-container">
				<h2 className="font-weight-bold">Students</h2>
				{ allStudents }
			</div>
		);
	}
}

export default Students;