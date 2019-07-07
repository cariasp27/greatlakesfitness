import { Link } from 'react-router-dom'
import React from 'react'
import '../components/components.css'
function NavLoggedin(props) {
    return (

        <div className='col-lg-12 navbar'>
            <section className="navbar-section">
                <Link to="#" className="btn btn-link text-secondary" onClick={props.onClick}>
                    <span className="text-secondary">Logout</span></Link>
                <Link to="/home" className="btn btn-link">
                    <span className="text-secondary">Home</span>
                </Link>
                <Link to="/search" className="btn btn-link">
                    <span className="text-secondary">Find A Trainer</span></Link>

            </section>

        </div>

    );
};
function NavLoggedout() {

    return (
        <div className='col-lg-12 navbar'><section className="navbar-section">
            <Link to="/signup" className="btn btn-link">
                <span className="text-secondary">Sign Up</span>
            </Link>
            <Link to="/login" className="btn btn-link">
                <span className="text-secondary">Login</span>
            </Link>
            <Link to="/" className="btn btn-link">
                <span className="text-secondary">Home</span>
            </Link>
        </section>
        </div>
    );
};
function NavisTrainer(props) {

    return (
        <div className='col-lg-12 navbar'>
            <section className="navbar-section">
                <Link to="#" className="btn btn-link text-secondary" onClick={props.onClick}>
                    <span className="text-secondary">Logout</span></Link>
                <Link to="/search" className="btn btn-link">
                    <span className="text-secondary">Find A Trainer</span>
                </Link>
                <Link to="/" className="btn btn-link">
                <span className="text-secondary">Home</span>
            </Link>

            </section>

        </div>
    );
}
export { NavLoggedin, NavLoggedout, NavisTrainer }