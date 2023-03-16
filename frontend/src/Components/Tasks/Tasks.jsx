import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./Tasks.css"
const Task = ({ task, deleteTask }) => (
  <tr>
    <td className="td-color">{task.taskName}</td>
    <td className="d-flex justify-content-end">
      <button
        className="btn btn-success"
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");
  const userID = jwt_decode(jwtToken).userID;
  const url = `https://localhost:7270/users/${userID}/allTasks`;

  async function getTasks() {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const fetchedTasks = await response.json();
    setTasks(fetchedTasks);
  }

  useEffect(() => {
    getTasks();
    return;
  }, [tasks.length]);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  async function deleteTask(id) {

    await fetch(`https://localhost:7270/usertask/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const newTasks = tasks["$values"].filter((t) => t.id !== id);
    setTasks(newTasks);
  }

  async function addTask() {
    let taskDTO = { TaskDescription: task };
    console.log(taskDTO);
    await fetch(`https://localhost:7270/users/${userID}/addtask`, {
      method: "POST",
      body: JSON.stringify(taskDTO),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });
    setTask("");
    getTasks();
  }

  const taskList = () => {
    return tasks["$values"]?.map((t) => {
      return <Task task={t} deleteTask={() => deleteTask(t.id)} key={t.id} />;
    });
  };

  return (
    <div className="task-background">
      <div className="justify-content-center align-items-center container pt-5">
        <h3 className="taskHeader">Tasks</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Task Description</th>
            </tr>
          </thead>
          <tbody>{taskList()}</tbody>
        </table>
        <div className="input-group pt-5">
          <input
            type="text"
            className="form-control border border-success bg-opacity"
            placeholder="Description"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={task}
            onChange={handleTaskChange}
          />
          <button className="btn btn-success" onClick={addTask}>
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};
export default Tasks;
