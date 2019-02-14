import React, { Component } from 'react';
import Axios from 'axios';
import NavbarTop from '../NavbarTop';

class NoteNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSubmit(event) {
		event.preventDefault();

		Axios.post('/api/note', {
			note: this.state.note,
			student_id: this.props.match.params.id
		})
		.then((response) => {
			if (response.request.status === 201) {
				this.props.history.push('/student/' + this.props.match.params.id);
			}
			else {
				alert('There was a problem saving the data. Please check your entries and try again.')
			}
		})
		.catch((error) => {
			alert('An error occurred. Please check your entries and try again.');
			console.log(error);
		})
	  }

	render() {
		const noteError = this.state.note.length > 500;
		const disableBtn = noteError;

		return (
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" linkLeft="/home" linkRight="" title="Add Student" />
				
				<div className="container content-container pt-2">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="note">Note:</label>
							<input type="text" className="form-control" id="note" name="note" value={this.state.note} onChange={this.handleInputChange} required />
						</div>

						<button type="submit" className="btn btn-primary mb-5"  disabled={disableBtn ? true : false} >Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default NoteNew;