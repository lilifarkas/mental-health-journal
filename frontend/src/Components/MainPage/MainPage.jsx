import React from 'react';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import MoodTracker from '../MoodTracker/MoodTracker';
import Garden from '../Garden/Garden';
import "./MainPage.css";

function MainPage() {
    return (
        <div className='container'>
            {/* < NavBar /> */}
            < Garden />
            < MoodTracker />
            {/* < Footer /> */}
        </div>
    );
}

export default MainPage;