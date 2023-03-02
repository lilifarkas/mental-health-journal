import {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode"; 

function EditProfile( ) {
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

    const onSubmit = async (e) => {
        e.preventDefault();

        await fetch(`https://localhost:7270/users/update/`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${jwtToken}`
            },
        });

        navigate("/profile");
    }

    return (
        <div className="main">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Username: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Profile"
                        className="send-button"
                    />
                </div>
            </form>
        </div>
    );
}

export default EditProfile;