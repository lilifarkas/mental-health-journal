import {Link, NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode"; 
import "./Profile.css"


function Profile( {id} ) {

    const navigate = useNavigate()
    const [user, setUser] = useState([]);
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
          const fetchedTasks = await response.json();
          setUser(fetchedTasks);
        }
      
        getUser();
      
        return;
      }, [user.length]);
    
    const deleteUser = async (e) => {
        e.preventDefault();

        await fetch(`https://localhost:7270/users/delete/${userID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
              }
        });
        
        navigate("/");
    }

    return (
        <div className="main">
            <div className="titles">
                <p>Name:</p>
                <p>{user.name}</p>
                <p>Email:</p>
                <p>{user.email}</p>
                <p>Points:</p>
                <p>{user.points}</p>
                <p>Tree:</p>
                <p>{user.trees}</p>
            </div>
            <div>
                <NavLink to={`profile/edit/${id}`}>
                <button>EDIT</button>
                </NavLink>
                <button onClick={deleteUser}>DELETE PROFILE</button>
            </div>
        </div>
    );
}

export default Profile;