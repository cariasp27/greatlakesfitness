import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom'
import Jumbotron from "../components/jumbotron"
import { List, ListItem } from "../components/list"
import API from "../utils/API"
import axios from 'axios';
import "../pages/pages.css"

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
              <div className="col-sm-1"></div>
              <div className='col-md-10 holder' id="search">
              <center><form className='form-horizontal'>
                <div className='form-group'>
                <input className='form-input'
                  type='text'
                  name='zipcode'
                  placeholder='zipcode'
                  value={this.state.zipcode}
                  onChange={this.handleChange}
                />
                </div>
              <div className='form-group'>
              <button onClick={this.handleSubmit}>
                Search
                    </button>
                    </div>
                    </form></center>


            {this.state.trainers.length ? (
                <List>
                  {this.state.trainers.map(trainer => {
                    return (
                      <ListItem key={trainer.username}>
                        <img className="card-img-top" src={trainer.profilepic} alt="Profile Pic"></img>
                        <div className="card-body">
                        <h1 className="card-title">{trainer.firstname + " " + trainer.lastname}</h1>
                        <p className="card-text">{trainer.zipcode}</p>
                        <Link to={"/profile/"+ trainer.username} className='btn btn-danger'>
                          <span>View Trainer</span>
                        </Link>
                        </div>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>
            <div className="col-sm-1"></div>
          </div>
        </div>
      );
    }
  }
}

export default Search;
