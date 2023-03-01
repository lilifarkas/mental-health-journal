import {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import './EditProfile.css'

function EditProfile( ) {
    
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

    const onSubmit = async (e) => {
        e.preventDefault();

        await fetch(`https://localhost:7270/users/update/2`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
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