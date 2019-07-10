import React, { Component } from "react";
import "../pages/pages.css"
import logo from "../img/logo.png"
import gym from "../img/gym-tile-500x500.jpg"

class Welcome extends Component {
    render() {
        return (
            <div className='row'>
            <div className='col-lg-12' id="welcome">
                <img id='logo' src={logo} alt="Great Lakes Fitness"></img>
            </div>
            <div className='col-sm-1'></div>
            <div className='col-md-5' id='info'>
                <img src={gym} alt="gym floor"></img>
            </div>
            <div className='col-md-1'></div>
            <div className='col-md-4' id='about'>
                <div className='col-md-12'>
                    <center><h1>About</h1></center>
                    <p>Great Lakes Fitness is a website that connects people who want to improve their personal fitness by locating personal trainers in their area.
                        Users can enter their zip code and trainers within 10 miles will be displayed. Make a workout request and get started working towards a better you.
                    </p>
                    <hr/>
                    <h1>Paul Carias</h1>
                    <p>
                        I have lived a fairly active lifestyle ever since my youth, participating in various youth sports including baseball, soccer, and basketball. I never lifted
                        weights until highschool when I went through winter training for the upcoming spring baseball season my sophomore year. Ever since, I have been a nut for fitness, whether it be cycling,
                        lifting weights, playing pickup basketball, even coaching kids soccer. I love to be active and have always had energy spilling everywhere. I want to share the same journey I am on to better myself
                        with everyone. We are all so powerful and we do not realize the true potential that lies within each and every one of us. 
                    </p>
                </div>
            </div>
            <div className='col-md-1'></div>
            </div>
        )
    }
}
export default Welcome;