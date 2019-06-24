import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		console.log(event);
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
	const istrainer = this.props.istrainer;
	if (this.state.redirectTo) {
		return <Redirect to={{ pathname: this.state.redirectTo }} />
	} else {
		return (
		<div className="SignupForm">
			<h4>Sign up</h4>
			<center><form className="form-horizontal">
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
				{istrainer ? (
                      				<div className="form-group ">
									  <div className="col-7"></div>
									  <button
										  className="btn btn-danger"
										  onClick={this.handleTrainerSubmit}
										  type="submit"
									  >Sign up</button>
								  </div>
                        // render bottom if not logged in
                    ) : (				<div className="form-group ">
					<div className="col-7"></div>
					<Link to="/trainersignup" className="btn btn-primary">
                                    <span className="text-secondary">Trainer?</span>
                                </Link>
					<button
						className="btn btn-primary"
						onClick={this.handleSubmit}
						type="submit"
					>Sign up</button>
				</div>)}

			</form></center>
		</div>

	)}
}
}

export default Signup
