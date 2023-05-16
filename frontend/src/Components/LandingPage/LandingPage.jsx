import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'
import { NavLink } from "react-router-dom";

function LandingPage() {
    return (
        <div className="landing-background">

            <div className="main">
                <header className="header-one">
                    <h1 className="title">MINDGARDEN</h1>
                    <p className="slogan">Your personal mental wellness companion</p>
                </header>
                <header className="header-two">
                    <div className="container1 text-center">
                        <h1 className="text">Our app is designed to support you on your journey to a happier and healthier mind.
                            With daily affirmations and a journal for your thoughts
                            we aim to help you prioritize your mental health and self-care.
                            Get started by logging in and begin your journey towards self-discovery and growth.</h1>
                    </div>
                </header>
                <p className="buttons">
                    <NavLink className="button-text" to="/registration">
                        <button className="btn button">
                            SIGN UP
                        </button>
                    </NavLink>
                    <NavLink className="button-text" to="/login">
                        <button className="btn button">
                            SIGN IN
                        </button>
                    </NavLink>
                </p>
            </div>
        </div>
    );
}
export default LandingPage;