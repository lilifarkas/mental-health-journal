import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode"; 

const Task = ({task, deleteTask})=>(
    <tr>
        <td>{task.id}</td>
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
    <div className='d-flex justify-content-center taskContainer'>
      <h3 className='taskHeader'>Tasks</h3>
      <div className='newTaskInputContainer'>
        <input type="text" className='form-container taskInput' placeholder='Task description' />
        <button className='btn btn-success'>Add Task</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Description</th>
          </tr>
        </thead>
        <tbody>
          {taskList()}
        </tbody>
      </table>
    </div>
  )
}
export default Tasks;
