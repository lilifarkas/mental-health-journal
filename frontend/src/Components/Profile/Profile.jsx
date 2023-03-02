import {Link, NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "./Profile.css"
import Modal from 'react-modal';


function Profile( {id} ) {

    const navigate = useNavigate()
    const [user, setUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
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
        setShowModal(true);
    }

    const handleDelete = async () => {
        await fetch(`https://localhost:7270/users/delete/2`, {
            method: "DELETE"
        });
        // close the modal and navigate to home page
        setShowModal(false);
        navigate("/");
    }

    const handleCancel = () => {
        // close the modal and stay on the profile page
        setShowModal(false);
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
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Delete Profile Modal"
                className="modalDelete"
            >
                <h2 className="titles">Are you sure you want to delete your profile?</h2>
                <div className="d-flex flex-row gap-5 mt-3">
                    <button className="button" onClick={handleDelete}>YES</button>
                    <button className="button" onClick={handleCancel}>NO</button>
                </div>
            </Modal>
        </div>
    );
}

export default Profile;