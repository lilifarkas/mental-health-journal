import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./MoodTracker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmojiAngry from '../Emojis/EmojiAngry/EmojiAngry';
import EmojiFrown from '../Emojis/EmojiFrown/EmojiFrown';
import EmojiNeutral from '../Emojis/EmojiNeutral/EmojiNeutral';
import EmojiSmile from '../Emojis/EmojiSmile/EmojiSmile';
import EmojiLaughing from '../Emojis/EmojiLaughing/EmojiLaughing';
import { HiCheck } from 'react-icons/hi';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import jwt_decode from "jwt-decode";
import URLmain from '../Constants/ConstantUrl';


const MoodTracker = ({toggleMenu}) => {
  const [rating, setRating] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [rated, setRated] = useState(false);

  //USER
  const jwtToken = localStorage.getItem("jwtToken");
  const userID = jwt_decode(jwtToken).userID;
  const currentDate = new Date();
  const [user, setUser] = useState(null);
  const url = `${URLmain}users/${userID}`;

  function getChildProps(value) {
    setRating(value);
    setSelectedEmoji(value);
    setIsDisabled(false);
  }
    
  async function getUser() {
    const response = await fetch(url, {
      method : 'GET',
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    });      
    const fetchedUser = await response.json();
    setUser(fetchedUser);
  }

  useEffect(() => {
    getUser();
    return;
    }, []);

  useEffect(()=>{
    if (user != null) {
      let userDate = new Date(user["lastMoodDate"])
      
      let current = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      let userStrDate = `${userDate.getFullYear()}-${userDate.getMonth() + 1}-${userDate.getDate()}`
      console.log(current);
      if (current === userStrDate) {
        setRated(true);
        console.log("asd")
      }
      
    }
  }, [user])
  
  async function addMood(event) {
    event.preventDefault();


    let moodDTO = {  MoodValue : rating,
                     DateCreated : currentDate };
    await fetch(`${URLmain}users/${userID}/addMood`, {
      method: "PUT",
      body: JSON.stringify(moodDTO),
      headers : {
        'Authorization' : `Bearer ${jwtToken}`,
        'Content-Type' : 'application/json'
      }
    });
    
    await fetch(`${URLmain}users/addPoints/${userID}`, {
            body: 50,
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwtToken}`
      }
    });

    toggleMenu();
  }

  return (
        <div className='mood-container'>
          <div className='mood-back'>
            <button className='btn btn-success btn-lg' onClick={toggleMenu}>Back</button>
          </div>
          {!rated && <>
            <div>
              <h3>Rate your mood for today.</h3>
            </div>

            <form className='ratingForm' onSubmit={(event) => addMood(event)}>
              <div className='inputs'>
                <div className={`inputWrapper`}>
                  <div id="angry-emoji-wrapper" className={`emoji-wrapper angry ${selectedEmoji === 0 ? 'selected' : ''}`}>
                    <EmojiAngry passedProp={getChildProps} value={0} />
                  </div>
                  <label className='inpLabel' htmlFor="0">Very Bad</label>
                </div>
                <div className={`inputWrapper`}>
                  <div id="frown-emoji-wrapper" className={`emoji-wrapper frown ${selectedEmoji === 1 ? 'selected' : ''}`}>
                    <EmojiFrown passedProp={getChildProps} value={1} />
                  </div>
                  <label className='inpLabel' htmlFor="1">Bad</label>
                </div>
                <div className={`inputWrapper`}>
                  <div id='neutral-emoji-wrapper' className={`emoji-wrapper neutral ${selectedEmoji === 2 ? 'selected' : ''}`}>
                    <EmojiNeutral passedProp={getChildProps} value={2} />
                  </div>
                  <label className='inpLabel' htmlFor="2">Average</label>
                </div>
                <div className={`inputWrapper`}>
                  <div id='smile-emoji-wrapper' className={`emoji-wrapper smile ${selectedEmoji === 3 ? 'selected' : ''}`}>
                    <EmojiSmile passedProp={getChildProps} value={3} />
                  </div>
                  <label className='inpLabel' htmlFor="3">Good</label>
                </div>
                <div className={`inputWrapper`}>
                  <div id='laughing-emoji-wrapper' className={`emoji-wrapper laugh ${selectedEmoji === 4 ? 'selected' : ''}`}>
                    <EmojiLaughing passedProp={getChildProps} value={4} />
                  </div>
                  <label className='inpLabel' htmlFor="4">Very Good</label>
                </div>
              </div>
              <button id='moodSubmitBtn' className='btn btn-success btn-lg' type="submit" disabled={isDisabled}>
                Submit
              </button>
            </form>
          </>}
          {rated && 
          <div className="rated-message">
            <h2>Already rated your mood for today.</h2>
            <h2> Please rate again tomorrow!</h2>
          </div>
          }
        </div>
      )
}

export default MoodTracker