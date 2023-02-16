import React, {useState} from 'react'
import "./MoodTracker.css";

const MoodTracker = () => {
  const [rating, setRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  function handleRatingChange(event) {
    setRating(Number(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let response = await fetch("https://localhost:7270/mood",{
      body:JSON.stringify({"description":rating}),
      method:"POST",
      headers:{"Content-Type":"application/json"}
    });

    let result = await response.json();

    console.log(result);
  }
  
  function handleEdit(event) {
    event.preventDefault();
    if(isEditing){
      setIsEditing(false);
    }else setIsEditing(true);
  }

  return (
    <>
      <div className='mood-container'>
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
          <>
          <form onSubmit={handleSubmit}>
            <input type="radio" name="rating" value="0" onChange={handleRatingChange} />
            <input type="radio" name="rating" value="1" onChange={handleRatingChange} />
            <input type="radio" name="rating" value="2" onChange={handleRatingChange} />
            <input type="radio" name="rating" value="3" onChange={handleRatingChange} /> 
            <input type="radio" name="rating" value="4" onChange={handleRatingChange} />
          </form>

          <button type="submit">Submit</button>
        </>
      </div>
    </>
  )
}

export default MoodTracker