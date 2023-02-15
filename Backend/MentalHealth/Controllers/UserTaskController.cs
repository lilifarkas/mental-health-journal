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
    public async Task<IEnumerable<UserTask>> GetAllTasks()
    {
        return await _repository.GetAll();;
    }
}