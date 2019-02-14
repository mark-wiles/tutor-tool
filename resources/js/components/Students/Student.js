import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Icon from '../Icon';
import NavbarTop from '../NavbarTop';

class Student extends Component {

	constructor(props) {
		super(props);
		this.state = {
			student: []
		};
	}

	componentDidMount() {
		var url = '/api/student/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			console.log(response.data);
			var student = response.data;
			this.setState({student});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	render() {
		const student = this.state.student;

		const notes = this.state.student.notes ? (this.state.student.notes.map((note) =>
				<div className="note-summary" key={note.id}>
						<h6>{note.note}</h6>
				</div>
			)) : null

		return(
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" classRight="fas fa-edit orange" linkLeft="/home" linkRight={`/student/edit/${student.id}`} title={student.first_name} />

				<div className="container content-container">
					<div className="student-icons row">
						<a className={!student.email ? "disabled-link" : ""} href={`mailto:${student.email}`} target="_blank">
							<Icon className="far fa-envelope" title="Email" />
						</a>
						<a className={!student.phone ? "disabled-link" : ""} href={`tel:${student.phone}`}>
							<Icon className="fas fa-mobile-alt" title="Call" />
						</a>
						<Link to="/lesson/new">
							<Icon className="far fa-calendar-plus" title="Lesson" />
						</Link>
					</div>

					<div className="student-info">
						<h5 className="info-title">Name</h5>
						<h5 className="info">{student.first_name} {student.last_name}</h5>
					</div>

					<div className="student-info">
						<h5 className="info-title">Hourly Rate</h5>
						<h5 className="info">{`$${student.rate}`}</h5>
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

					<div className="notes">
						<h5 className="info-title pt-2">Notes</h5>

						{ notes }

						<Link to={'/note/new/' + student.id}>
							<h5 className="info-title orange pt-2">Add Note</h5>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Student;