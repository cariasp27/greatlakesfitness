import React, { Component } from "react";
import Jumbotron from "../components/jumbotron"
import { Redirect } from 'react-router-dom'
import { List, ListItem} from "../components/list"
import axios from 'axios';
import "../pages/pages.css"
import API from "../utils/API";

class Home extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
      workouts: [],
      redirectTo: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
    // API.getworkouts(this.state.id).then(res => {
    //   console.log(res)
    //   this.setState({
    //     workouts: res.data.requests
    //   })  
    // })

  }

  updateUser(userObject) {
    this.setState(userObject)
  }
  getUser() {
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        let usernam = response.data.user.username;
        let idd = response.data.user.id;
        console.log('There is a user saved in the server session: ')
        
        this.setState({
          loggedIn: true,
          username: usernam,
          id: idd
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

  render() {
    if (this.state.redirectTo) {
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
              <div className='col-sm-1'></div>
              <div className='col-md-5' id='upcoming'>
                <h2>Upcoming</h2>
                map workouts where accepted = true
            </div>
              <div className='col-md-5' id="pending">
              {this.state.workouts.length ? (
                <List>
                  {this.state.workouts.map(workout => {
                    return (
                      <ListItem key={workout.id}>
                        <h1>{workout.time + " " + workout.date}</h1>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>
            <div className='col-sm-1'></div>
            </div>
            ) : (<Redirect to={{ pathname: '/' }} />)}

        </div>
      );
    }
  }
}

export default Home;
