import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Tasks.css';
const Task = ({ task, deleteTask }) => (
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
  const [newTask, setNewTask] = useState('');
  const url = "https://localhost:7270/users/1/allTasks";

  useEffect(() => {
    async function getTasks() {
      const response = await fetch(url);
      const fetchedTasks = await response.json();
      console.log(fetchedTasks.$values);
      setTasks(fetchedTasks.$values);
    }
    getTasks();

    return;
  }, [tasks.length]);

  async function AddNewTask() {
    let response = await fetch(`https://localhost:7270/users/1`)
    let user = await response.json();
    delete user.id; //remove user id to avoid request error
    console.log(user, newTask);
    try {
      let resp2 = await fetch(`https://localhost:7270/usertask`, {
        body: JSON.stringify({
          "taskname": newTask,
          "complete": false,
          "users": [user]
        }),
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
      setNewTask('');
      if (resp2.ok) {
        console.log(resp2)
        setTasks(newTask);
      }
      else {
        console.warn(resp2)
      }
    }
    catch (error) {
      console.error('ERROR', error);
    }
  }

  async function deleteTask(id) {
    await fetch(`https://localhost:7270/usertask/${id}`, {
      method: "DELETE"
    });

    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);

  };
  const taskList = () => {
    return tasks.map(t => {
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
        <input type="text" onChange={(e) => setNewTask(e.target.value)} className='form-container taskInput' placeholder='Task description' />
        <button onClick={() => AddNewTask()} className='btn btn-success'>Add Task</button>
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
