import React, { Component } from 'react';
import axios from 'axios';
import NavbarTop from './NavbarTop';

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
			this.setState({student});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	render() {
		var student = this.state.student;

		return(
			<div className="row">
				<NavbarTop iconClass="fas fa-edit orange" linkLeft="/settings" linkRight="/student/edit" title={student.first_name} />

				<div className="container content-container">
					<div className="student-info">
						<h5 className="info-title">Name</h5>
						<h5 className="info">{student.first_name} {student.last_name}</h5>
					</div>

					<div className="student-info">
						<h5 className="info-title">Phone</h5>
						<h5 className="info">{student.phone}</h5>
					</div>

					<div className="student-info">
						<h5 className="info-title">Email</h5>
						<h5 className="info">{student.email}</h5>
					</div>

					<div className="student-info">
						<h5 className="info-title">Address</h5>
						<div className="info">
							<h5 className="text-right">{student.street}</h5>
							<h5 className="text-right">{student.city}, {student.state}</h5>
							<h5 className="text-right">{student.zip}</h5>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Student;