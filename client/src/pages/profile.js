import React, { Component } from "react";
import "../pages/pages.css"
import Jumbotron from "../components/jumbotron"
import axios from "axios"

class Profile extends Component {
    constructor() {
        super()
        this.state = {
          loggedIn: false,
          tusername: '',
          redirectTo: null
        }
    
        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
      }
      componentDidMount() {
        this.getUser()
        const trainer = this.props;
        console.log(trainer)
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
        // const blah = this.props.location.search;
        // console.log(blah);
        const isTrainer = this.props.isTrainer;

        return(
 
            <div className="row">
                <Jumbotron></Jumbotron>
                {/* right here is where I would put input fields to add bio, upload photo to firebase, and update zipcodes */}
                { isTrainer ? (<div>
                <p>render the trainers data as input fields able to accept new values to be changed</p>
            </div>):(<div><p>render whatever trainer is in the url</p></div>)}
            </div>
        )
    }
}
export default Profile;