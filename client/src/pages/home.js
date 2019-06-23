import React, { Component } from "react";
import Jumbotron from "../components/jumbotron"
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import "./style.css"

  class Home extends Component {
    constructor() {
      super()
      this.state = {
        loggedIn: false,
        username: null,
    //  workouts: [],
      redirectTo: null
      }
  
      this.getUser = this.getUser.bind(this)
      this.componentDidMount = this.componentDidMount.bind(this)
      this.updateUser = this.updateUser.bind(this)
    }
  
    componentDidMount() {
      this.getUser()
    }
  
    updateUser (userObject) {
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
            username: response.data.user.username
          })
        } else {
          console.log('NO USER');
          this.setState({
            loggedIn: false,
            username: null,
            redirectTo: '/'
          })
          
        }
      })
    }
  
    render() {  if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
  } else {
      const loggedIn = this.props.loggedIn;
      console.log('Home has rendered with the following props: ')
      console.log(this.props);
      
      return (
        <div>
        {loggedIn ? (
          <div className='row'>
            <Jumbotron></Jumbotron>
            <div className='col-md-6' id='upcoming'>
              <h2>Upcoming</h2>
              map workouts where accepted = true
            </div>
            <div className='col-md-6' id="pending">
              <h1>Pending</h1>
              map workouts where accepted = false
            </div>
          </div>) : (<Redirect to={{ pathname: '/' }}/>)}
      
          </div>
      );
    }
  }
  }
  
  export default Home;
  