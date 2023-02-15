using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[ApiController, Route("/usertask")]
public class UserTaskController : ControllerBase
{
    private readonly TaskRepository _repository;

    public UserTaskController(TaskRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    public async Task AddUserTask(UserTask userTask)
    {
        await _repository.Add(userTask);
    }

    [HttpGet("{taskID}")]
    public async Task<UserTask> GetUserTask(long taskID)
    {
        return await _repository.Get(taskID);
    }
    
    [HttpGet]
    public async Task<IEnumerable<UserTask>> GetAllUserTasks()
    {
        return await _repository.GetAll();
    }

    [HttpPut]
    public async Task UpdateUserTask([FromBody] UserTask task)
    {
        await _repository.Update(task);
    }

    [HttpDelete("{taskID}")]
    public async Task DeleteUserTask(long taskID)
    {
        await _repository.Delete(taskID);
    }
}