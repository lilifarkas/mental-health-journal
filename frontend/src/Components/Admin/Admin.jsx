import React, { useEffect, useState } from "react";

export default function UsersList() {
    
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`https://localhost:7270/users`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const result = await response.json();
            setUsers(result.$values);
            setFilteredUsers(result.$values);
            setSortedUsers(result.$values);
           console.log(result.$values)
        }

        getUsers();
        
    }, []);
    

        
    return (
        <div>
            <h3>Users List</h3>
            <select id = "arrange" onChange={(e) => {
                if (e.target.value === " By Name ") {
                    sortByName();
                } else if (e.target.value === " By Points ") {
                    sortByPoints();
                }
            }}>
                <option> Arrange </option>
                <option> By Name </option>
                <option> By Points </option>
            </select>
            <input id="filterName" type="text"
                   placeholder="Filter name" onChange={(e) => filterName(e.target.value)}></input>
            <input id="filterPoints" type="text"
                   placeholder="Filter points" onChange={(e) => filterPoints(e.target.value)}></input>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}