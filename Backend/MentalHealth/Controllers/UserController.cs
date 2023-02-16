using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using MentalHealth.Service;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[ApiController, Route("/users")]
public class UserController: ControllerBase
{
    private readonly UserService _service;

    public UserController(UserService service)
    {
        _service = service;
    }

    [HttpPost("/users/add")]
    public async Task<User> AddNewUser([FromBody] User user)
    {
        await _service.AddToDb(user);
        return user;
    }
    
    [HttpGet("/users/{id}")]
    public async Task<User?> GetUserById(long id)
    {
        return await _service.GetFromDb(id);
    }
    
    [HttpGet]
    public async Task<IEnumerable<User>> GetAllUser()
    {
        return await _service.GetAllFromDb();
    }
    
    [HttpPut("/users/update/")]
    public async Task UpdateUser(long id, [FromBody] User user)
    {
        await _service.UpdateInDb(user);
    }
    
    [HttpDelete("/users/delete/{id}")]
    public async Task DeleteUser(long id)
    {
        await _service.DeleteFromDb(id);
    }

    [HttpGet("{userID}/allTasks")]
    public async Task<List<UserTask>> GetUserTasks(long userID)
    {
        return await _service.TasksForUser(userID);
    }

    [HttpPost("{userID}/addTask")]
    public async Task AddTask(long userID, [FromBody] UserTask task)
    {
        await _service.AddTaskToUser(userID, task);
    }
}