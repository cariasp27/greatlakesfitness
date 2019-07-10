import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import "../pages/pages.css"
import Jumbotron from "../components/jumbotron"

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            isTrainer: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTrainerSubmit = this.handleTrainerSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changetoTrainer = this.changetoTrainer.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    changetoTrainer(event) {
        event.preventDefault();
        this.setState({
            isTrainer: true
        })
    }


    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios.post('/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log('login response: ')
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
                console.log('login error: ')
                alert("invalid username/password");
                console.log(error);

            })
    }

    handleTrainerSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios.post('/login/trainer', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username,
                        isTrainer: true
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/home'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
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
                <div id="loginholder">
                    <h4>Login</h4>
                    <center><form className="form-horizontal">
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">Username:  </label>
                            <input className="form-input"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <label className="form-label" htmlFor="password">Password:  </label>
                            <input className="form-input"
                                placeholder="password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        {isTrainer ? (
                            <div className="form-group">
                            <button
                                className="btn btn-primary"
                                onClick={this.handleTrainerSubmit}
                                type="submit">Login</button>
                        </div>
                        ) : (
                            <div className="form-group">
                            <button
                                className="btn btn-primary"
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                                <button
                                className="btn btn-primary"
                                onClick={this.changetoTrainer}
                                type="submit">Trainer?</button>
                        </div>
                        )}
                        
                    </form></center>
                </div>
                </div>
            )
        }
    }
}

export default LoginForm
