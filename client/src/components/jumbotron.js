import React, { Component } from "react";
import '../components/components.css'
import logo from "../img/logo.png"

class Jumbotron extends Component {
    render() {
        return (
            <div className='col-lg-12 jumbo'>
                <img id="logo" src={logo} alt="Great Lakes Fitness"></img>
            </div>
        );
    }
}

export default Jumbotron