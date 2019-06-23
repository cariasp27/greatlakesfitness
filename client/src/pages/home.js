import React, { Component } from "react";
import Jumbotron from "../components/jumbotron"
import LoginForm from './login-form'
import axios from 'axios';
import "./style.css"

  class Home extends Component {
    constructor() {
      super()
      this.state = {
        loggedIn: false,
        username: null,
        redirectTo: null,
    //  workouts: [],
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
          console.log('Get User: There is a user saved in the server session: ')
        // axios.get(/requests/:id).then(response => {
        // this.setState({
        //    workouts: response.data
        // }) 
        // })
          this.setState({
            loggedIn: true,
            username: response.data.user.username
          })
        } else {
          console.log('Get user: no user');
          this.setState({
            loggedIn: false,
            username: null
          })
        }
      })
    }
  
    render() {
      const loggedIn = this.props.loggedIn;
      console.log('books render, props: ')
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
          </div>
      // render bottom if not logged in
      ) : (<LoginForm></LoginForm>)}
          </div>
      );
    }
  }
  
  export default Home;
  