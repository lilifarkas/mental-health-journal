import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    const url = "https://localhost:7270/users/1/allTasks";

    useEffect(() => {
        async function getTasks() {
          const response = await fetch(url);      
          const fetchedTasks = await response.json();
          console.log(fetchedTasks);
          setTasks(fetchedTasks);
        }
      
        getTasks();
      
        return;
      }, [tasks.length]);

    async function deleteTask(id) {
        await fetch(`https://localhost:7270/usertask/${id}`, {
          method: "DELETE"
        });
        
        const newTasks = tasks["$values"].filter((t) => t.id !== id);
        setTasks(newTasks);
      
    };
      const taskList = ()=>{
        return tasks["$values"]?.map(t=>{
            return(
                <Task 
                task={t} 
                deleteTask={() => deleteTask(t.id)}
                key={t.id}
                />
            )
        })
      }
      return (
        <div className='d-flex justify-content-center'>
          <h3>Tasks</h3>
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
