using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using MentalHealth.Service;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[ApiController, Route("/usertask")]
public class UserTaskController : ControllerBase
{
    private readonly TaskService _service;

    public UserTaskController(TaskService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task AddUserTask(UserTask userTask)
    {
        await _service.AddUserTask(userTask);
    }

    [HttpGet("{taskID}")]
    public async Task<UserTask> GetUserTask(long taskID)
    {
        return await _service.GetUserTask(taskID);
    }
    
    [HttpGet]
    public async Task<IEnumerable<UserTask>> GetAllUserTasks()
    {
        return await _service.AllUserTasks();
    }
    
    [HttpPut]
    public async Task UpdateUserTask([FromBody] UserTask task)
    {
        await _service.UpdateUserTask(task);
    }
    
    [HttpDelete("{taskID}")]
    public async Task DeleteUserTask(long taskID)
    {
        await _service.DeleteUserTask(taskID);
    }
}