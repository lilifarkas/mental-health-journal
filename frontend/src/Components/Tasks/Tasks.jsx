
import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import "./Tasks.css";
import URL from '../Constants/ConstantUrl'


const Task = ({task, finishTask, startTask})=>{
  if(task.status === "Not started"){
    return (
      <tr>
          <td>{task.description}</td>
          <td className='d-flex justify-content-end'>
              <button className="btn btn-success"
              onClick={() => {
                  startTask(task.id)
              }}
              >
              Start
              </button>
          </td>
      </tr>
    )
  }else
  if(task.status === "In progress")
  return (
    <tr>
        <td>{task.description}</td>
        <td>You get {task.point} points for completing</td>
        <td className='d-flex justify-content-end'>
            <button className="btn btn-success"
            onClick={() => {
                finishTask(task.id,task.point);
            }}
            >
            Finish
            </button>
        </td>
    </tr>
  )
}

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");
  const userID = jwt_decode(jwtToken).userID;
  const url = `${URL}users/${userID}/allTasks`;

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
      }

  async function startTask(id) {
      await fetch(`${URL}usertask/${id}`, {
        method: "PUT",
        headers : {
          'Authorization' : `Bearer ${jwtToken}`
        }
      }); 

      getTasks();
  }
  async function addPoints(point){
    await fetch(`${URL}users/addPoints/${userID}`, {
      body: point,
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
      }
    });
  }

  function finishTask(id,point){
    deleteTask(id);
    addPoints(point);
  }

  async function deleteTask(id) {

        await fetch(`${URL}usertask/${id}`, {
          method: "DELETE",
          headers : {
            'Authorization' : `Bearer ${jwtToken}`
          }
        });

        const newTasks = tasks["$values"].filter((t) => t.id !== id);
        setTasks(newTasks);
    }
    
  async function addTask() {
    let taskDTO = {TaskDescription : task}
    
    await fetch(`${URL}users/addTask/${userID}`, {

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

    return tasks['$values']?.map(t => {
      return (
        <Task
          task={t}
          finishTask={() => finishTask(t.id,t.point)}
          startTask={() => startTask(t.id)}
          key={t.id}
        />
      )
    })
  }


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
