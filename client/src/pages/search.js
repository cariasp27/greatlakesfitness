import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
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
      userId: '',
      trainers: [],
      zipcode: '',
      redirectTo: null,
      trainertodisplay: null,
      displaytrainer: false,
      reqdate: '',
      reqtime: '',
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.trainerbiorequest = this.trainerbiorequest.bind(this)
  }
  handleReqSubmit(event) {
    event.preventDefault();
    axios.post('/newrequest', {
      time: this.state.reqtime,
      date: this.state.reqdate,
      accepted: false,
      userId: this.state.userId,
      trainerId: this.state.trainertodisplay.trainer.id

    }).then((res) =>{
      res.send({"msg":"200"})
    })
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
    console.log(event.target.value)
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

  trainerbiorequest (trainer) {
    console.log(trainer)
    this.setState({
      trainertodisplay: trainer,
      trainers: [],
      displaytrainer: true
    })
  }
  getUser() {
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('There is a user saved in the server session: ')
        this.setState({
          userId: response.data.user.id,
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
    const trainerbio = this.state.displaytrainer;
    const trainer = this.state.trainertodisplay
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div className="row">
          <Jumbotron></Jumbotron>
              <div className='col-lg-12 holder' id="search">
              <center><form>
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
            {trainerbio ? ( 
              <div className="col-lg-12">
              <img src={trainer.profilepic} alt="Profile Pic" id="profilepic"></img>
                  <h1>{trainer.firstname + " " + trainer.lastname}</h1>
                  <h3>{trainer.zipcode}</h3>
                  <h1>Request a Workout</h1>
                  <center><form>
                    <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input
                    className='form-input'
                    type="text" 
                    name="reqdate" 
                    value={this.state.reqdate} 
                    onChange={this.handleChange} />
                    <label htmlFor="date">Time: </label>
                    <input
                    className='form-input'
                    type="text"
                    name="reqtime"
                    value={this.state.reqtime}
                    onChange={this.handleChange} />
                    <button 
                    className="btn-primary"
                    onClick={this.handleReqSubmit}>Submit Request</button>
                  </div>
                  </form></center>
                  </div>
                  ): (<div></div>)}

            {this.state.trainers.length ? (
                <List>
                  {this.state.trainers.map(trainer => {
                    return (
                      <ListItem key={trainer.username}>
                        <img className="card-img-top" src={trainer.profilepic} alt="Profile Pic"></img>
                        <div className="card-body">
                        <h1 className="card-title">{trainer.firstname + " " + trainer.lastname}</h1>
                        <p className="card-text">{trainer.zipcode}</p>
                        <button className='btn-primary' onClick={() => this.trainerbiorequest(trainer)}>View Info</button>
                        </div>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}

          </div>
        </div>
      );
    }
  }
}

export default Search;
