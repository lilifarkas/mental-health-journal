import React from 'react';
import MoodTracker from '../MoodTracker/MoodTracker';
import Garden from '../Garden/Garden';
import "./MainPage.css";

function MainPage() {
    return (
        <div className='container'>
            {/* < NavBar /> */}
            < Garden />
            < MoodTracker />
        </div>
    );
}

export default MainPage;