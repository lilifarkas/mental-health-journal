import React from 'react';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import MoodTracker from '../MoodTracker/MoodTracker';
import "./MainPage.css";
import { Navigate } from "react-router-dom";

function MainPage() {
    return (
        <div className='container'>
            < MoodTracker />
        </div>
    );
}

export default MainPage;