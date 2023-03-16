import React, { useState, useEffect } from 'react';
import MoodTracker from '../MoodTracker/MoodTracker';
import Garden from '../Garden/Garden';
import "./MainPage.css";

const CheckIn = ({CheckIn}) => {
    return (
        <div className="checkin-child checkin-background">
            <div className='checkin'>
                <h1 className='checkin-text-height'>How are you feeling today?</h1>
            </div>
            <div className='checkin-button'>
                <button className='btn btn-success btn-lg' onClick={CheckIn}>Check In</button>
            </div>
        </div>
    )
}

const MotivationalQuote = () => {
    const [quote, setQuote] = useState({});

    async function getQuote() {
        const response = await fetch("https://api.api-ninjas.com/v1/quotes?category=inspirational", {
          method : 'GET',
          headers: {
            "X-Api-Key": "80Z1HWpbMhX5Hds9IRA/ow==F3pVKrCHjebfC4SO"
          }
        });      
        const fetchedQuote = await response.json();
        setQuote(fetchedQuote[0]);
    }
  
    useEffect(() => {
        getQuote();
    }, []);

    return (
        <div className="quote-background">
            <div className='quote-items'>
                <div className="quote-title">
                    <h1>A quote to keep you going.</h1>
                </div>
                <div className="quote-text">
                    {quote.length != 0 &&
                    <>
                        <h4>„{quote.quote}”</h4>
                        <h5>- {quote.author}</h5>
                    </> 
                    }
                </div>
            </div>
        </div>
    )
}

function MainPage() {
    const [checkin, setCheckin] = useState(true);

    const CheckInModal = () =>{
        setCheckin(!checkin);
    }

    return (
        <div className='mainpage-background'>
            <div className='mainpage-container pt-5'>
                <div>
                <MotivationalQuote />
                </div>
                <div className='mainpage-container-row'>
                    {checkin && <CheckIn CheckIn={CheckInModal}/>}
                    {!checkin &&
                            <MoodTracker toggleMenu={CheckInModal}/>
                    }
                    < Garden />
                </div>
                
                {/* < MoodTracker /> */}
            </div>
        </div>
    );
}

export default MainPage;