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
        await _service.AddToDb(userTask);
    }

    [HttpGet("{taskID}")]
    public async Task<UserTask> GetUserTask(long taskID)
    {
        return await _service.GetFromDb(taskID);
    }
    
    [HttpGet]
    public async Task<IEnumerable<UserTask>> GetAllUserTasks()
    {
        return await _service.GetAllFromDb();
    }
    
    [HttpPut]
    public async Task UpdateUserTask([FromBody] UserTask task)
    {
        await _service.UpdateInDb(task);
    }
    
    [HttpDelete("{taskID}")]
    public async Task DeleteUserTask(long taskID)
    {
        await _service.DeleteFromDb(taskID);
    }
}