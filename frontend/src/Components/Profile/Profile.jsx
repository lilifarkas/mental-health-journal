import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const User = (props) => (
    <div className="data">
        <p>{props.record.name}</p>
        <p>{props.record.email}</p>
        <p>{props.record.points}</p>
        <div>
            <Link className="btn btn-link" to={`/edit/${props.record.id}`}>Edit</Link> |
            <Link className="btn btn-link" to={`/deleted`}>Delete</Link>

        </div>
    </div>
);

function Profile() {

    const [users, setUsers] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`https://localhost:7270/users`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const result = await response.json();
            setUsers(result);
        }

        getUsers();

        return;
    }, []);

    // // This method will delete a record
    // async function deleteRecord(id) {
    //     await fetch(`http://localhost:5000/${id}`, {
    //         method: "DELETE"
    //     });
    //
    //     const newRecords = records.filter((el) => el._id !== id);
    //     setRecords(newRecords);
    // }

    // This method will map out the record with the biggest id on the table
    function UserList() {
        const userWithBiggestId = users.sort((a, b) => b.id - a.id)[0];
        console.log(userWithBiggestId)
        
            return (
                <User
                    record={userWithBiggestId}
                    key={userWithBiggestId.id}
                />
            );
        
    }

    return (
        <div className="main">
            <div className="titles">
                <p>Name</p>
                <p>Email</p>
                <p>Points</p>
            </div>
            {UserList()}
        </div>
    );
}

export default Profile;