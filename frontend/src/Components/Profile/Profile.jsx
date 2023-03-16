import {Link, NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode"; 
import "./Profile.css"
import Modal from 'react-modal';


function Profile(  ) {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [moods, setMoods] = useState([]);
    
    const jwtToken = localStorage.getItem("jwtToken");
    const userID = jwt_decode(jwtToken).userID;
    const url = `https://localhost:7270/users/${userID}`;

    useEffect(() => {
        async function getUser() {
          const response = await fetch(url, {
            method : 'GET',
            headers: {
              "Authorization": `Bearer ${jwtToken}`
            }

          });
            const result = await response.json();

            return result;
        }

        getUser().then(result => {
            setUser(result);
            setMoods(result.moods);
        }).catch(error => {
            console.error(error);
        });
      
        return;
      }, []);

    
    if(user == null){
        return <div className="mt-5 loading">Loading...</div>;
    }
    
    const deleteUser = async (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const handleDelete = async () => {
       
        await fetch(`https://localhost:7270/users/delete/${userID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
              }

        });
        // close the modal and navigate to home page
        setShowModal(false);
        navigate("/");
    }

    const handleCancel = () => {
        // close the modal and stay on the profile page
        setShowModal(false);
    }
    
    const averageMood = () =>{
        
        const allMoods = moods.$values;
        
        
        
         let moodMessage;

        if (!moods || !moods.$values || moods.$values.length < 7) {
            moodMessage =  "Track your mood for at least 7 days to get average!";
        }else {
            const lastSevenMoods = moods.$values.slice(-7);
            const lastSevenDescriptions = lastSevenMoods.map((mood) => mood.description);
            const sumOfDescriptions = lastSevenDescriptions.reduce(
                (acc, description) => acc + description,
                0
            );
            const averageDescription = Math.round(sumOfDescriptions / 7);

            switch (averageDescription) {
                case 0:
                    moodMessage = "0 - Very negative mood";
                    break;
                case 1:
                    moodMessage = "1 - Mildly negative mood";
                    break;
                case 2:
                    moodMessage = "2 - Neutral mood";
                    break;
                case 3:
                    moodMessage = "3 - Mildly positive mood";
                    break;
                case 4:
                    moodMessage = "4 - Very positive mood";
                    break;
                default:
                    moodMessage = "";
            }
        }
        return moodMessage
        
    }

    const moodMessage = averageMood();

    return (
        <div className="main d-flex flex-column mt-lg-5 justify-content-center">
            <h3 className="title">PROFILE</h3>
            <div className="titles d-inline-flex flex-column mt-lg-5">
                <div className="d-inline-flex d-flex flex-row gap-5">
                    <p className="d-inline-flex">Name:</p>
                    <p className="d-inline-flex">{user.name}</p>
                </div>
                <div className="d-inline-flex d-flex flex-row gap-5">
                    <p className="d-inline-flex">Email:</p>
                    <p className="d-inline-flex">{user.email}</p> 
                </div>
                <div className="d-inline-flex d-flex flex-row gap-5">
                    <p className="d-inline-flex">Points:</p>
                    <p className="d-inline-flex">{user.points}</p>
                </div>
                <div className="d-inline-flex d-flex flex-column">
                    <p className="d-inline-flex">Average mood in the last 7 days:</p>
                    <p>{moodMessage}</p>
                </div>
            </div>
            <div className="d-inline-flex gap-5">
                <NavLink to={`/profile/edit`}>
                <button className="button">EDIT</button>
                </NavLink>
                <button onClick={() => setShowModal(true)} className="button">DELETE PROFILE</button>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Delete Profile Modal"
                className="modalDelete"
            >
                <h2 className="titles">Are you sure you want to delete your profile?</h2>
                <div className="d-flex flex-row gap-5 mt-3">
                    <button className="button" onClick={deleteUser}>YES</button>
                    <button className="button" onClick={handleCancel}>NO</button>
                </div>
            </Modal>
        </div>
    );
}

export default Profile;