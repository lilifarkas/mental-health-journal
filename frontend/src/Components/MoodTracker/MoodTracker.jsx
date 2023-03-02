import React, { useState } from 'react'
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

const MoodTracker = ({user}) => {
  let navigate = useNavigate();
  let loader = document.querySelector('.MoodLoadingContainer');
  let check = document.querySelector('.MoodCheck');
  let text = document.querySelector('.MoodSubmitText');
  let submitBtn = document.querySelector('#moodSubmitBtn');
  let error = document.querySelector('.MoodSubmitError');
  let errorMessage = document.querySelector('.MoodErrorMessage');

  const [rating, setRating] = useState(0);
  //const [isEditing, setIsEditing] = useState(false);
  const [rated, setRated] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [shouldShow, setShouldShow] = useState(false);

  const lastShownDateString = localStorage.getItem('lastShownDate');
  const lastShownDate = lastShownDateString ? new Date(lastShownDateString) : null;

  const now = new Date();
  const shouldShowToday = !lastShownDate || now.getDate() !== lastShownDate.getDate();

  if (shouldShowToday) {
    localStorage.setItem('lastShownDate', now.toDateString());
  }
  console.log(now.getDate(), lastShownDate.getDate(), shouldShow, now.toDateString(), lastShownDateString);

  // function handleRatingChange(event) {
  //   setRating(parseInt(props.value));
  //   console.log((event.target.props.value));
  // }

  function getChildProps(value) {
    setRating(value);
    setSelectedEmoji(value);
    console.log(value)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    loader.style.visibility = 'visible';
    text.style.visibility = 'hidden';
    setTimeout(async () => {
      try {
        let response = await fetch("https://localhost:7270/mood", {
          body: JSON.stringify({ "description": rating }),
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("JwtToken")}`
          }

        });
        let result = await response.json();
        if (response.ok) {
          check.style.visibility = 'visible';
          loader.style.visibility = 'hidden';
          console.log(result);
          setTimeout(async () => {
            if (shouldShowToday) {
              setShouldShow(false);
              console.log(now.getDate(), lastShownDate.getDate(), shouldShow, now.toDateString(), lastShownDateString);
            }
            navigate("/profile");
          }, 1000)
        }
        else {
          submitBtn.classList.remove('btn-success');
          submitBtn.classList.add('btn-danger');
          error.style.visibility = 'visible';
          setTimeout(async () => {
            submitBtn.classList.remove('btn-danger');
            submitBtn.classList.add('btn-success');
            error.style.visibility = 'hidden';
            text.style.visibility = 'visible';
          }, 1000);
          console.error('Error')
        }
      } catch (err) {
        console.error(`ERROR: ${err}`);
        errorMessage.style.visibility = 'visible';
        check.style.visibility = 'hidden';
        loader.style.visibility = 'hidden';
        submitBtn.classList.value = 'btn btn-danger';
        submitBtn.disabled = true;
        error.style.visibility = 'visible';
        setTimeout(async () => {
          submitBtn.disabled = false;
          errorMessage.style.visibility = 'hidden';
          submitBtn.classList.value = 'btn btn-success'
          error.style.visibility = 'hidden';
          text.style.visibility = 'visible';
        }, 3000);
      }
    }, 1000)
  }

  // function handleEdit(event) {
  //   event.preventDefault();
  //   if (isEditing) {
  //     setIsEditing(false);
  //   } else setIsEditing(true);
  // }
  return (
    <>
      {/* {isEditing ? (<>
          <form onSubmit={handleSubmit}>
          <input type="radio" name="rating" value="0" onChange={handleRatingChange} />
            <input type="radio" name="rating" value="1" onChange={handleRatingChange} />
            <input type="radio" name="rating" value="2" onChange={handleRatingChange} />
            <input type="radio" name="rating" value="3" onChange={handleRatingChange} /> 
            <input type="radio" name="rating" value="4" onChange={handleRatingChange} />
            </form>
            
            <button type="submit" onClick={handleEdit}>Submit</button>
            </>
            ) : (<>
          <form>
            <input type="radio" disabled="disabled" name="rating" value="1" onChange={handleRatingChange} />
            <input type="radio" disabled="disabled" name="rating" value="2" onChange={handleRatingChange} /> 
            <input type="radio" disabled="disabled" name="rating" value="3" onChange={handleRatingChange} />
            <input type="radio" disabled="disabled" name="rating" value="4" onChange={handleRatingChange} /> 
            <input type="radio" disabled="disabled" name="rating" value="5" onChange={handleRatingChange} />
            </form>
            
            <button onClick={handleEdit}>Edit</button>
          </>)} */}
      {shouldShow && (
        <div className='mood-container'>
          <h3 className="ratingHeader">How are you feeling today?</h3>

          <form className='ratingForm' onSubmit={(event) => handleSubmit(event)}>
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
            <button id='moodSubmitBtn' className='btn btn-success' type="submit">
              <span className='MoodSubmitText'>Submit</span>
              <div className='MoodLoadingContainer'>
                <span className="MoodLoader"></span>
              </div>
              <div className='MoodCheck'>
                <HiCheck />
              </div>
              <div className='MoodSubmitError'>
                <MdOutlineReportGmailerrorred />
              </div>
            </button>
            <span className='MoodErrorMessage'>Unable to reach the server! Please try again later! </span>
          </form>
        </div>
      )
    }
    {!shouldShow && (<div className='NoMoreUse'>
      <p className='nousetext'>You can set your mood only once a day!</p> 
      <button className='btn btn-success backBtn' onClick={() => navigate('/profile')}>Back</button>
    </div>)}
    </>
  );
}

export default MoodTracker