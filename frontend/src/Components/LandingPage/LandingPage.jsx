import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'

function LandingPage() {
    return (
        <div className="container-fluid my-5">
            <header className="d-flex flex-column align-items-center py-5">
                <h1 className="text-success font-weight-bold">MINDGARDEN</h1>
                <p className="text-muted">Your personal mental wellness companion</p>
            </header>
            <header className="bg-primary text-white d-flex align-items-center" style={{ height: "60vh" }}>
                <div className="container text-center">
                    <h1 className="display-4">Our app is designed to support you on your journey to a happier and healthier mind.
                        With daily affirmations and a journal for your thoughts
                        we aim to help you prioritize your mental health and self-care.
                        Get started by logging in and begin your journey towards self-discovery and growth.</h1>
                    
                    <p className="lead">
                        <button className="btn btn-outline-light btn-lg">SIGN UP</button>
                        <button className="btn btn-outline-light btn-lg">SIGN IN</button>
                    </p>
                </div>
            </header>
        </div>
    );
}
export default LandingPage;