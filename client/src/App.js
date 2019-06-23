import axios from 'axios';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Signup from './pages/sign-up';
import LoginForm from './pages/login-form';
import Navbar from './components/navbar';
import Home from './pages/home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
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
  return (
    <Router>
       <div className="App">
   
   <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
   {/* Routes to different components */}
   <Route
     exact path="/"
     render={() =>
       <LoginForm
         updateUser={this.updateUser}
       />} />
       <Switch>
   <Route
     path="/home"
     render={() =>
       <Home
         updateUser={this.updateUser}  loggedIn={this.state.loggedIn}
       />}
   />
   <Route
     path="/signup"
     render={() =>
       <Signup/>}
   />
</Switch>
 </div>
    </Router>
  );
}
}

export default App;
