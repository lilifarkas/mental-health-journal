import {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";

function EditProfile( ) {
    const navigate = useNavigate()
    const params = useParams();
    const [user, setUser] = useState([]);
    

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