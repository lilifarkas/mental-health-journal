import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import "./Profile.css"


function Profile( {id} ) {

    const [user, setUser] = useState([]);
    
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`https://localhost:7270/users/${id}`);

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
                <p>Tasks:</p>
                <ul>
                    {user.userTasks.map(task => <li>task.taskName</li>)}
                </ul>
            </div>
            <div>
                <NavLink to={`profile/edit/${id}`}>
                <button>EDIT</button>
                </NavLink>
            </div>
        </div>
    );
}

export default Profile;