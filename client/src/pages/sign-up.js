import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
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
		console.log(event.target.value)
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
		console.log(this.state.username)

		//request to server to add a new username/password
		axios.post('/trainersignup', {
			username: this.state.username,
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
				<div className="SignupForm">
					<h4>Sign up</h4>
					<center>
						{isTrainer ? (<form className="form-horizontal">
							<div className="form-group">
								<div className="col-1 col-ml-auto">
									<label className="form-label" htmlFor="username">Username</label>
								</div>
								<div className="col-3 col-mr-auto">
									<input className="form-input"
										type="text"
										id="username"
										name="username"
										placeholder="Username"
										value={this.state.username}
										onChange={this.handleChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-1 col-ml-auto">
									<label className="form-label" htmlFor="password">Password: </label>
								</div>
								<div className="col-3 col-mr-auto">
									<input className="form-input"
										placeholder="password"
										type="password"
										name="password"
										value={this.state.password}
										onChange={this.handleChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-1 col-ml-auto">
									<label className="form-label" htmlFor="zipcode">Zipcode: </label>
								</div>
								<div className="col-3 col-mr-auto">
									<input className="form-input"
										placeholder="zipcode"
										type="text"
										name="zipcode"
										value={this.state.zipcode}
										onChange={this.handleChange}
									/>
								</div>
							</div>

							<div className="form-group ">
								<div className="col-7"></div>
								<button
									className="btn btn-primary"
									onClick={this.handleTrainerSubmit}
									type="submit"
								>Sign up</button>
							</div>

						</form>
						) : (<form className="form-horizontal">
							<div className="form-group">
								<div className="col-1 col-ml-auto">
									<label className="form-label" htmlFor="username">Username</label>
								</div>
								<div className="col-3 col-mr-auto">
									<input className="form-input"
										type="text"
										id="username"
										name="username"
										placeholder="Username"
										value={this.state.username}
										onChange={this.handleChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-1 col-ml-auto">
									<label className="form-label" htmlFor="password">Password: </label>
								</div>
								<div className="col-3 col-mr-auto">
									<input className="form-input"
										placeholder="password"
										type="password"
										name="password"
										value={this.state.password}
										onChange={this.handleChange}
									/>
								</div>
							</div>
							<div className="form-group ">
								<div className="col-7"></div>
								<button
									className="btn btn-primary"
									onClick={this.handleTrainerSignup}
								>Trainer?</button>
								<button
									className="btn btn-primary"
									onClick={this.handleSubmit}
									type="submit"
								>Sign up</button>
							</div>

						</form>
							)}</center>
				</div>

			)
		}
	}
}

export default Signup
