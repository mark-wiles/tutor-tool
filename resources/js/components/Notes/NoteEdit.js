import React, { Component } from 'react';
import Axios from 'axios';
import NavbarTop from '../NavbarTop';

class NoteEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: '',
			student_id: ''
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		var url = '/api/note/' + this.props.match.params.id;

		axios.get(url
		)
		.then((response) => {
			console.log(response);
			let note = response.data;
			this.setState(
				{
					note: note.note,
					student_id: note.student_id
				}
			);
		})
		.catch((error) => {
			console.log(error)
		});
	}

	handleDelete() {
		var confirmed = confirm('Are you sure you would like to delete the Note? This action cannot be undone.');
		if (confirmed) {
			let url = '/api/note/' + this.props.match.params.id;
			axios.delete(url
			)
			.then((response) => {
				if (response.request.status === 200) {
					let url = '/student/' + this.state.student_id;
					this.props.history.push(url);
				}
				else {
					alert('A problem occurred. Please try again later.');
				}
			})
			.catch((error)=> {
				console.log(error);
			})
		}
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
		let url = '/api/note/' + this.props.match.params.id;

		Axios.put(url, {
			note: this.state.note,
			student_id: this.state.student_id
		})
		.then((response) => {
			if (response.request.status === 200) {
				this.props.history.push('/student/' + this.state.student_id);
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
		const noteError = this.state.note.length > 255;
		const disableBtn = noteError;

		return (
			<div className="row">
				<NavbarTop classLeft="fas fa-arrow-left orange" linkLeft={`/student/${this.state.student_id}`} classRight="fas fa-times orange" linkRight={`/student/${this.state.student_id}`} title="Edit Note" />
				
				<div className="container content-container">
					<form className="pt-2" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="note">Note:</label>{noteError ? <span className="text-danger"> Max Length is 255 characters</span> : ''}
							<textarea className={`form-control ${ noteError ? 'error' : ''}`} id="note" name="note" value={this.state.note} onChange={this.handleInputChange} autoFocus required />
						</div>

						<button type="submit" className="btn btn-primary mb-5"  disabled={disableBtn ? true : false} >Submit</button>
					</form>

					<div className="row">
						<h6 className="col-md-12 text-center orange" onClick={this.handleDelete}>Delete Note</h6>
					</div>
				</div>
			</div>
		);
	}
}

export default NoteEdit;