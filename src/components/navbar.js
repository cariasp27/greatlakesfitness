import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);

        return (
            <div className='row'>
                <div className='col-lg-12 navbar'>
                    {/* ternary expression render top if logged in*/}
                    {loggedIn ? (
                        <section className="navbar-section">
                            <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">Logout</span></Link>

                        </section>
                        // render bottom if not logged in
                    ) : (
                            <section className="navbar-section">
                                <Link to="/signup" className="btn btn-link">
                                    <span className="text-secondary">Sign Up</span>
                                </Link>
                                <Link to="/" className="btn btn-link">
                                    <span className="text-secondary">Login</span>
                                </Link>
                            </section>
                        )}
                </div>
            </div>

        );

    }
}

export default Navbar