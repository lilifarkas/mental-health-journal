import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'
import { NavLink } from "react-router-dom";

function LandingPage() {
    return (
        <div className=" main">
            <header className="header-one">
                <h1 className="title">MINDGARDEN</h1>
                <p className="slogan">Your personal mental wellness companion</p>
            </header>
            <header className="header-two">
                <div className="container text-center">
                    <h1 className="text">Our app is designed to support you on your journey to a happier and healthier mind.
                        With daily affirmations and a journal for your thoughts
                        we aim to help you prioritize your mental health and self-care.
                        Get started by logging in and begin your journey towards self-discovery and growth.</h1>
                    
                    <p className="buttons">
                        <button className="btn button">
                        <NavLink  className="button-text" to="/users">
                        SIGN UP
                        </NavLink>
                        </button>
                        <button className="btn button">
                        <NavLink className="button-text" to="/users">
                        SIGN IN
                        </NavLink>
                        </button>
                    </p>
                </div>
            </header>
        </div>
    );
}
export default LandingPage;