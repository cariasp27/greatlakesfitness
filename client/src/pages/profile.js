import React, { Component } from "react";
import "../pages/pages.css"
import { Redirect } from 'react-router-dom'
import Jumbotron from "../components/jumbotron"
import axios from "axios"

class Profile extends Component {
    constructor() {
        super()
        this.state = {
          loggedIn: false,
          username: '',
          tusername: '',
          redirectTo: null,
          trainer: {}
        }
    
        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
      }
      componentDidMount() {
        this.getUser()
        const trainer = this.props;
        console.log(trainer)
        console.log(this.state.trainer)
      }
    
      updateUser(userObject) {
        this.setState(userObject)
      }
      getUser() {
        axios.get('/user').then(response => {
          console.log('Get user response: ')
          console.log(response.data)
          if (response.data.user) {
            console.log('There is a user saved in the server session: ')
            this.setState({
              loggedIn: true,
              username: response.data.user.username,
              trainer: response.data.user
            })
            console.log(this.state.trainer)
          } else {
            console.log('NO USER');
            this.setState({
              loggedIn: false,
              username: null,
              redirectTo: '/',
            })
    
          }
        })
      }
    
    render() {
        const trainer = this.state.trainer
        const isTrainer = this.props.isTrainer;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
 
            <div className="row">
                <Jumbotron></Jumbotron>
                {/* right here is where I would put input fields to add bio, upload photo to firebase, and update zipcodes */}
                { isTrainer ? (
                <div className="col-md 12 holder">
                  <img src={trainer.profilepic} alt="Profile Pic" id="profilepic"></img>
                </div>
                  ):(
                  <div><p>render whatever trainer is in the url</p></div>)}
            </div>
        )
    }
  }
}
export default Profile;