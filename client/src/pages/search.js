import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import API from "../utils/API"
import axios from 'axios';
import "./style.css"

class Search extends Component {
    constructor() {
        super()
        this.state = {
          loggedIn: false,
          username: null,
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
          console.log(res)
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
                <div className='col-md-6'></div>
            </div>) : (<Redirect to={{ pathname: '/' }}/>)}
        
            </div>
        );
      }
    }
    }
    
    export default Search;
    