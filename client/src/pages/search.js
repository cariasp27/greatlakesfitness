import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import Jumbotron from "../components/jumbotron"
import { List, ListItem } from "../components/list"
import API from "../utils/API"
import axios from 'axios';
import "./style.css"

class Search extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      trainers: [],
      zipcode: '',
      redirectTo: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    API.findtrainers(this.state.zipcode)
      .then(res => {
        console.log(res.data.trainers)
        this.setState({
            trainers: res.data.trainers
        })
      })

  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  componentDidMount() {
    this.getUser()
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

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <Jumbotron></Jumbotron>
          <div className='row'>
            <div className='col-md-6'>
              <div className='col-md-12'>
                <input className='form-input'
                  type='text'
                  name='zipcode'
                  placeholder='zipcode'
                  value={this.state.zipcode}
                  onChange={this.handleChange}
                />
              </div>
              <button onClick={this.handleSubmit}>
                Search
                    </button>
            </div>
            <div className='col-md-6'>
            {this.state.trainers.length ? (
                <List>
                  {this.state.trainers.map(trainer => {
                    return (
                      <ListItem key={trainer.id}>
                        <h1>{trainer.firstname + " " + trainer.lastname}</h1>
                        <p>{trainer.zipcode}</p>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Search;
