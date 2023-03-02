import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './EditProfile.css'
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

        await fetch(`https://localhost:7270/users/update/${userID}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${jwtToken}`
            },
        });

        navigate("/profile");
    }
    
    const takeBackToProfile = () => {
        navigate("/profile");
    }

    return (
        <div className="main mt-5 d-flex flex-column justify-content-center">
            <h3 className="title">UPDATE <br/> PROFILE</h3>
            <form onSubmit={onSubmit} className="d-inline-flex flex-column ">
                <div className="form-group">
                    <label htmlFor="name" className="titles mt-2">Username: </label>
                    <input
                        type="text"
                        className="form-control mt-2 w-50"
                        id="name"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="titles mt-2">Email: </label>
                    <input
                        type="text"
                        className="form-control mt-2 w-50"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="titles mt-2">Password: </label>
                    <input
                        type="text"
                        className="form-control mt-2 w-50"
                        id="password"
                        value={user?.password&& "*".repeat(user.password.length)}
                        onChange={(e) => setUser({...user, password: e.target.value })}
                    />
                </div>
                <div className="form-group mt-5 d-flex flex-row gap-5">
                    <input
                        type="submit"
                        value="Update Profile"
                        className="send-button button"
                    />
                    <button className="button" onClick={takeBackToProfile}>BACK</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;