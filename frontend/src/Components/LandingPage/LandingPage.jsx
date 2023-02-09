import React from 'react';
import pic from './backround.png'

function LandingPage() {
    return (
        <div className="main">
            <div className="logo-container">
                <img src={pic}
                     alt="logo"
                     className="logo"></img>
            </div>
            <div className="title">
                <p>
                    Say hello to <span className="highlighted">MindGarden</span>, <br/> your personal mental wellness companion!
                </p>
            </div>
            <div className="description-container">
                <p className="description">Our app is designed to support you on your journey to a happier and healthier mind.
                    With daily affirmations and a journal for your thoughts
                    we aim to help you prioritize your mental health and self-care.
                    Get started by logging in and begin your journey towards self-discovery and growth.</p>
            </div>
            <div className="button-container">
                <button className="button">Start for free</button>
                <button className="button">Log In</button>
            </div>

        </div>
    );
}
export default LandingPage;