import axios from 'axios';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css"
// Components
import Signup from './pages/sign-up';
import LoginForm from './pages/login-form';
import Navbar from './components/navbar';
import Home from './pages/home'
import Welcome from './pages/welcome'
import Search from './pages/search'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      isTrainer: false,

    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    console.log("Component did mount AXIOS GET USER")
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      }
      // } else if (response.data.user.isTrainer){
      //   console.log('Get User: There is a user saved in the server session: ')
      //   this.setState({
      //     loggedIn: true,
      //     username: response.data.user.username,
      //     isTrainer: response.data.user.isTrainer
      //   })
      // }
      else {
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

          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} isTrainer={this.state.isTrainer} />
          {/* Routes to different components */}
          <Switch>
            <Route
              exact path='/'
              render={() =>
                <Welcome />} />
            <Route
              path="/login"
              render={() =>
                <LoginForm
                  updateUser={this.updateUser}
                />} />

            <Route
              path="/home"
              render={() =>
                <Home
                  updateUser={this.updateUser} loggedIn={this.state.loggedIn} isTrainer={this.state.isTrainer}
                />}
            />
            <Route
              path="/signup"
              render={() =>
                <Signup updateUser={this.updateUser} loggedIn={this.state.loggedIn} />}
            />
            <Route
              path="/search"
              render={() =>
                <Search updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
              }
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
