import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarTop from '../NavbarTop';

class StudentsInactive extends Component {

	constructor(props) {
		super(props);
		this.state = {
			students: []
		};
	}

	componentDidMount() {
		axios.get('/api/students/inactive'
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
			
				<div className="summary" key={student.id}>
					<Link to={'/student/' + student.id}>
						<h4 className="font-weight-bold mb-1">{student.first_name} {student.last_name}</h4>
						<h6 className="mb-0">{student.addresses[0] ? student.addresses[0].city + ', ' : ''}{student.addresses[0] ? student.addresses[0].state : ''}</h6>
					</Link>
				</div>
		)

		return (
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="" linkLeft="/settings" linkRight="" title="Inactive" />

				<div className="container content-container">
					{ allStudents }
				</div>
			</div>
		);
	}
}

export default StudentsInactive;