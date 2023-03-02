import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode"; 

const Task = ({task, deleteTask})=>(
    <tr>
        <td>{task.taskName}</td>
        <td>
            <button className="btn btn-success"
            onClick={() => {
                deleteTask(task.id);
            }}
            >
            Delete
            </button>
        </td>
    </tr>
)

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const jwtToken = localStorage.getItem("jwtToken");
    const userID = jwt_decode(jwtToken).userID;
    const url = `https://localhost:7270/users/${userID}/allTasks`;
    
    useEffect(() => {
        async function getTasks() {
          const response = await fetch(url, {
            method : 'GET',
            headers: {
              "Authorization": `Bearer ${jwtToken}`
            }
          });      
          const fetchedTasks = await response.json();
          setTasks(fetchedTasks);
        }
      
        getTasks();
      
        return;
      }, [tasks.length]);

  async function deleteTask(id) {
        await fetch(`https://localhost:7270/usertask/${userID}`, {
          method: "DELETE",
          headers : {
            'Authorization' : `Bearer ${jwtToken}`
          }
        });
        
        const newTasks = tasks["$values"].filter((t) => t.id !== id);
        setTasks(newTasks);
      
    };

  async function deleteTask(id) {
    await fetch(`https://localhost:7270/usertask/${id}`, {
      method: "DELETE"
    });

    const newTasks = tasks['$values'].filter((t) => t.id !== id);
    setTasks(newTasks);

  };
  const taskList = () => {
    return tasks['$values']?.map(t => {
      return (
        <Task
          task={t}
          deleteTask={() => deleteTask(t.id)}
          key={t.id}
        />
      )
    })
  }
  return (
    <div className='justify-content-center align-items-center container mt-5 pt-5'>
      <h3 className='taskHeader'>Tasks</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Task Description</th>
          </tr>
        </thead>
        <tbody>
          {taskList()}
        </tbody>
      </table>
      <div class="input-group pt-5">
      <input type="text" class="form-control border border-success bg-opacity" placeholder='Description' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
      <button className='btn btn-success'>Add task</button>
    </div>
    </div>
  )
}
export default Tasks;
