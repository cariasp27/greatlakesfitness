import React, { Component } from "react";
import "../pages/pages.css"
import logo from "../img/logo.png"

class Welcome extends Component {
    render() {
        return (
            <div className='row'>
            <div className='col-lg-12' id="welcome">
                <img id='logo' src={logo} alt="Great Lakes Fitness"></img>
            </div>
            <div className='col-sm-1'></div>
            <div className='col-md-5' id='info'></div>
            <div className='col-md-1'></div>
            <div className='col-md-4' id='about'>
                <div className='col-md-12'>
                    <center><h1>About</h1></center>
                    <p>Great Lakes Fitness is a website that connects people who want to improve their personal fitness by locating personal trainers in their area.
                    </p>
                </div>
            </div>
            <div className='col-md-1'></div>
            </div>
        )
    }
}
export default Welcome;