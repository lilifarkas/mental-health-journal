import React, { useState } from 'react'
import "./MoodTracker.css";

const MoodTracker = () => {
  const [rating, setRating] = useState(0);
  //const [isEditing, setIsEditing] = useState(false);
  const [rated, setRated] = useState(false);

  function handleRatingChange(event) {
    setRating(Number(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let response = await fetch("https://localhost:7270/mood", {
      body: JSON.stringify({ "description": rating }),
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    let result = await response.json();
    if (response.ok) {
      console.log(result);
      setRated(true);
    }
    else {
      console.error('Error')
    }
  }

  // function handleEdit(event) {
  //   event.preventDefault();
  //   if (isEditing) {
  //     setIsEditing(false);
  //   } else setIsEditing(true);
  // }

  return (
    <>
      {rated === false && <div className='mood-container'>
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
          <h3 className="ratingHeader">How are you feeling today?</h3>
        <>
          <form className='ratingForm' onSubmit={(event) => handleSubmit(event)}>
            <div className='inputs'>
              <div className='inputWrapper'>
                <input id='inp0' className='rateInput' type="radio" name="rating" value="0" onChange={(event) => handleRatingChange(event)} />
                <label className='inpLabel' htmlFor="inp0">Very Bad</label>
              </div>
              <div className='inputWrapper'>
                <input id='inp1' className='rateInput' type="radio" name="rating" value="1" onChange={(event) => handleRatingChange(event)} />
                <label className='inpLabel' htmlFor="inp1">Bad</label>
              </div>
              <div className='inputWrapper'>
                <input id='inp2' className='rateInput' type="radio" name="rating" value="4" onChange={(event) => handleRatingChange(event)} />
                <label className='inpLabel' htmlFor="inp2">Average</label>
              </div>
              <div className='inputWrapper'>
                <input id='inp3' className='rateInput' type="radio" name="rating" value="3" onChange={(event) => handleRatingChange(event)} />
                <label className='inpLabel' htmlFor="inp3">Good</label>
              </div>
              <div className='inputWrapper'>
                <input id='inp4' className='rateInput' type="radio" name="rating" value="2" onChange={(event) => handleRatingChange(event)} />
                <label className='inpLabel' htmlFor="inp4">Very Good</label>
              </div>
            </div>
            <div className='submitBtn'>
              <button type="submit">Submit</button>
            </div>
          </form>

        </>
      </div>}
    </>
  )
}

export default MoodTracker