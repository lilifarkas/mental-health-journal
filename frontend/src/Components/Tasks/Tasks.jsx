import React, { useState, useEffect } from 'react';

const Task = ({task})=>(
    <tr>
        <td>{task.id}</td>
        <td>{task.taskName}</td>
    </tr>
)

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const url = "https://localhost:7270/users/1/allTasks";

    useEffect(() => {
        async function getTasks() {
          const response = await fetch(url);      
          const fetchedTasks = await response.json();
          setTasks(fetchedTasks);
        }
      
        getTasks();
      
        return;
      }, [tasks.length]);

      const taskList = ()=>{
        return tasks["$values"]?.map(t=>{
            return(
                <Task 
                task={t} 
                key={t.id} 
                />
            )
        })
      }
      return (
        <div>
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
