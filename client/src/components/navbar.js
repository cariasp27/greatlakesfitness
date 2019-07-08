import React, { Component } from 'react'
import '../components/components.css'
import axios from 'axios'
import { NavLoggedout, NavLoggedin, NavisTrainer } from "./navbuttons"

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            redirectTo: null
        }

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
                    username: null,
                    redirectTo: "/"
                })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        const isTrainer = this.props.isTrainer;
        console.log('NavBar has rendered with the following props: ')
        console.log(this.props);
        let navbuttons;
        // render this if logged in as trainer
        if (isTrainer) {
            navbuttons = < NavisTrainer onClick={this.logout} />
        }
// render this if logged in
        else if (loggedIn) {
            navbuttons = < NavLoggedin onClick={this.logout} />
        }
// render this if not logged in
        else {
            navbuttons = <NavLoggedout />
        }

        return (
            <div className='row'>
                {navbuttons}
            </div>
        )
    }
}

export default Navbar