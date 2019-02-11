import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarTop from '../NavbarTop';

class Students extends Component {

	constructor(props) {
		super(props);
		this.state = {
			students: []
		};
	}

	componentDidMount() {
		axios.get('/api/students'
		)
		.then((response) => {
			console.log(response);
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
						<h4 className="font-weight-bold mb-1">{student.first_name} {student.last_name}</h4>
						<h6 className="mb-0">{student.city}, {student.state}</h6>
					</Link>
				</div>
		)

		return (
			<div className="row">
				<NavbarTop classLeft="fas fa-cog orange" classRight="fas fa-plus orange" linkLeft="/settings" linkRight="/student/new" title="Students" />

				<div className="container content-container">
					{ allStudents }
				</div>
			</div>
		);
	}
}

export default Students;