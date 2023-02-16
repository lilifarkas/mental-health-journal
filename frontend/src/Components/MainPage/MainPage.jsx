import React from 'react';
import NavBar from "../NavBar/NavBar";
import MoodTracker from '../MoodTracker/MoodTracker';
import "./MainPage.css";

function MainPage() {
    return (
        <div className='main-container'>
            < NavBar />
            < MoodTracker />
        </div>
    );
}

export default MainPage;