import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import "../pages/pages.css"
import Jumbotron from '../components/jumbotron';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			firstname: '',
			lastname: '',
			username: '',
			password: '',
			profilepic: '',
			zipcode: '',
			redirectTo: null,
			isTrainer: false

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleTrainerSubmit = this.handleTrainerSubmit.bind(this)
		this.handleTrainerSignup = this.handleTrainerSignup.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleTrainerSignup(event) {
		event.preventDefault();
		this.setState({
			isTrainer: true
		})

	}
	handleTrainerSubmit(event) {
		event.preventDefault();
		console.log('sign-up handleSubmit, username: ')

		//request to server to add a new username/password
		axios.post('/trainersignup', {
			username: this.state.username,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			password: this.state.password,
			zipcode: this.state.zipcode,
			isTrainer: true

		})
			.then(response => {
				console.log('signup response: ')
				console.log(response)
				if (response.status === 200) {
					// update App.js state
					this.props.updateUser({
						loggedIn: true,
						username: response.data.username,
						isTrainer: response.data.isTrainer
					})
					// update the state to redirect to home
					this.setState({
						redirectTo: '/home'
					})
				}
			}).catch(error => {
				console.log('Something went Wrong')
				alert("invalid username/password");
				console.log(error);

			})

	}
	handleSubmit(event) {
		event.preventDefault()
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)

		//request to server to add a new username/password
		axios.post('/signup', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log('signup response: ')
				console.log(response)
				if (response.status === 200) {
					// update App.js state
					this.props.updateUser({
						loggedIn: true,
						username: response.data.username
					})
					// update the state to redirect to home
					this.setState({
						redirectTo: '/home'
					})
				}
			}).catch(error => {
				console.log('Something went Wrong')
				alert("invalid username/password");
				console.log(error);

			})
	}


	render() {
		const isTrainer = this.state.isTrainer;
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className='row'>
				<Jumbotron></Jumbotron>
				<div className="SignupForm">
					<h4>Sign up</h4>
					<center>
						{/* render this if trainer */}
						{isTrainer ? (<form className="form-horizontal">
							<div className="form-group">
									<label className="form-label" htmlFor="username">Username:</label>
									<input className="form-input"
										type="text"
										id="username"
										name="username"
										placeholder="Username"
										value={this.state.username}
										onChange={this.handleChange}
									/>
									<label className="form-label" htmlFor="firstname">First Name:</label>
									<input className="form-input"
										type="text"
										id="firstname"
										name="firstname"
										placeholder="First Name"
										value={this.state.firstname}
										onChange={this.handleChange}
									/>
									<label className="form-label" htmlFor="lastname">Last Name:</label>
									<input className="form-input"
										type="text"
										id="lastname"
										name="lastname"
										placeholder="Last Name"
										value={this.state.lastname}
										onChange={this.handleChange}
									/>
									<label className="form-label" htmlFor="password">Password: </label>

									<input className="form-input"
										placeholder="Password"
										type="password"
										name="password"
										value={this.state.password}
										onChange={this.handleChange}
									/>
									<label className="form-label" htmlFor="profilepic">Link to Photo: </label>
									<input className="form-input"
										placeholder="photo link"
										type="text"
										name="profilepic"
										value={this.state.profilepic}
										onChange={this.handleChange}
									/>
									<label className="form-label" htmlFor="zipcode">Zipcode: </label>
									<input className="form-input"
										placeholder="zipcode"
										type="text"
										name="zipcode"
										value={this.state.zipcode}
										onChange={this.handleChange}
									/>
								<button
									className="btn btn-primary"
									onClick={this.handleTrainerSubmit}
									type="submit"
								>Sign up</button>
							</div>

						</form>
							// render below is not trainer
						) : (<form className="form-horizontal">
							<div className="form-group">
									<label className="form-label" htmlFor="username">Username</label>
									<input className="form-input"
										type="text"
										id="username"
										name="username"
										placeholder="Username"
										value={this.state.username}
										onChange={this.handleChange}
									/>
									<label className="form-label" htmlFor="password">Password: </label>
									<input className="form-input"
										placeholder="password"
										type="password"
										name="password"
										value={this.state.password}
										onChange={this.handleChange}
									/>
							<div className="form-group ">
								<button
									id="trainerbtn"
									className="btn btn-primary"
									onClick={this.handleTrainerSignup}
								>Trainer?</button>
								<button
									id='userbtn'
									className="btn btn-primary"
									onClick={this.handleSubmit}
									type="submit"
								>Sign up</button>
							</div>
							</div>

						</form>
							)}</center>
				</div>
				</div>

			)
		}
	}
}

export default Signup
