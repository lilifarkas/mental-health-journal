import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import './Admin.css';
import URL from '../Constants/ConstantUrl';

const User = (props) => {
    return (
        <tr>
            <td>{props.record.id}</td>
            <td>{props.record.name}</td>
            <td>{props.record.email}</td>
            <td>
                <select name="roles" id="adminRoleEdit" onChange={(e) => UpdateUserRole(e, props.record)}>
                    <option value={props.record.role}>{props.record.role}</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <span className={`AdminLoader`}></span>
            </td>
            <td>{props.record.points}</td>
            {/* <td>
            <button className="btn btn-link"
            onClick={() =>
                props.deleteUser(props.record.id)}>
                Delete
                </button>
            </td> */}
        </tr>)
};

async function UpdateUserRole(e, record) {
    let row = e.target.parentNode;
    let loader = row.querySelector('.AdminLoader');
    let token = localStorage.getItem('jwtToken');
    const user = GetUser(e, record);
    let body;
    if (user) {
        body = JSON.stringify(user);
    }
    else {
        console.error('EMPTY USER FILE');
    }
    loader.style.visibility = "visible";
    let response = await fetch(`${URL}users/updaterole/${record.id}`, {
        method: 'PUT',
        body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        loader.style.visibility = "hidden";
    }
    else {
        loader.style.visibility = "hidden";
    }
}

function GetUser(e, record) {
    return {
        email: record.email,
        id: record.id,
        moods: record.moods,
        name: record.name,
        password: record.password,
        points: record.points,
        role: e.target.value,
        trees: record.trees,
        userTasks: record.userTasks
    }
}

export default function UsersList({ handleLogout }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortedIsChanged, setSortedIsChanged] = useState(false);
    const jwtToken = localStorage.getItem("jwtToken");
    
    useEffect(() => {
        
        getUsers();
        
    }, []);
    async function getUsers() {
        const response = await fetch(`${URL}users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.warn(message);
            return;
        }

        const result = await response.json();
        setUsers(result.$values);
        setFilteredUsers(result.$values);
        setSortedUsers(result.$values);
    }

    function recordList() {
        const userList = sortedIsChanged === true ? sortedUsers : filteredUsers;
        return userList.map((record) => {
            return (
                <User
                    record={record}
                    key={record.id}
                />
            );
        });
    }

    function sortByName() {
        const sorted = [...sortedUsers].sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        setSortedUsers(sorted);
        setSortedIsChanged(true);
    }

    function sortByPoints() {
        const sorted = [...sortedUsers].sort((a, b) => (a.points > b.points) ? 1 : ((b.points > a.points) ? -1 : 0));
        setSortedUsers(sorted);
        setSortedIsChanged(true);
    }

    function filterRoles(e) {
        const value = e.toLowerCase();
        const filtered = users.filter(x => x.role.toLowerCase().includes(value));
        setFilteredUsers(filtered);
    }

    function sortByRole() {
        const sorted = [...sortedUsers].sort((a, b) => (a.role > b.role) ? 1 : ((b.role > a.role) ? -1 : 0));
        setSortedUsers(sorted);
        setSortedIsChanged(true);
    }

    function notSorted() {
        setSortedUsers(users);
        setSortedIsChanged(false);
    }

    function filterName(e) {
        const value = e.toLowerCase();
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(value)
        );
        setFilteredUsers(filtered);
    }

    function filterPoints(e) {
        const value = e.toLowerCase();
        const filtered = users.filter((user) =>
            user.points.toString().includes(value)
        );
        setFilteredUsers(filtered);
    }

    function filterId(e) {
        const value = e.toLowerCase();
        const filtered = users.filter((user) =>
            user.id.toString().includes(value)
        );
        setFilteredUsers(filtered);
    }

    return (
        <div className="bg-light">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <button className='logout' onClick={handleLogout}>
                    <BiLogOut color="black" />
                </button>
                <h3 className="mt-5">Users List</h3>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <select className="d-inline-flex mt-3" id="arrange" onChange={(e) => {
                    if (e.target.value === "By Name") {
                        sortByName();
                    } else if (e.target.value === "By Points") {
                        sortByPoints();
                    } else if (e.target.value === "Arrange") {
                        notSorted();
                    } else if (e.target.value === "By Role") {
                        sortByRole();
                    }
                }}>
                    <option> Arrange </option>
                    <option> By Name </option>
                    <option> By Points </option>
                    <option> By Role </option>
                </select>
                <input className="d-inline-flex mt-3" id="filterName" type="text"
                    placeholder="Filter name" onChange={(e) => filterName(e.target.value)}></input>
                <input className="d-inline-flex mt-3" id="filterPoints" type="text"
                    placeholder="Filter points" onChange={(e) => filterPoints(e.target.value)}></input>
                <input className="d-inline-flex mt-3" id="filterId" type="text"
                    placeholder="Filter ID" onChange={(e) => filterId(e.target.value)}></input>
                <input className="d-inline-flex mt-3" id="filterRole" type="text"
                    placeholder="Filter roles" onChange={(e) => filterRoles(e.target.value)}></input>
            </div>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}