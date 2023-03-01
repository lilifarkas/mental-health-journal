import {Link, NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "./Profile.css"


function Profile( {id} ) {

    const navigate = useNavigate()
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`https://localhost:7270/users/2`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const result = await response.json();
            setUser(result);
        }

        getUsers();

        return;
    }, []);
    
    const deleteUser = async (e) => {
        e.preventDefault();

        await fetch(`https://localhost:7270/users/delete/2`, {
            method: "DELETE"
        });
        
        navigate("/");
    }

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
                <div className="d-inline-flex d-flex flex-row gap-5">
                    <p className="d-inline-flex">Tree:</p>
                    <p className="d-inline-flex">{user.trees}</p>
                </div>
            </div>
            <div className="d-inline-flex gap-5">
                <NavLink to={`/profile/edit`}>
                <button className="button">EDIT</button>
                </NavLink>
                <button onClick={deleteUser} className="button">DELETE PROFILE</button>
            </div>
        </div>
    );
}

export default Profile;