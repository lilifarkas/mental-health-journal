using MentalHealth.Models.Entities;
using MentalHealth.Repository;
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
        await _service.Add(user);
        return user;
    }
    
    [HttpGet("/users/{id}")]
    public async Task<User?> GetUserById(long id)
    {
        return await _service.Get(id);
    }
    
    [HttpGet]
    public async Task<IEnumerable<User>> GetAllUser()
    {
        return await _service.GetAll();
    }
    
    [HttpPut("/users/update/")]
    public async Task UpdateUser(long id, [FromBody] User user)
    {
        await _service.Update(user);
    }
    
    [HttpDelete("/users/delete/{id}")]
    public async Task DeleteUser(long id)
    {
        await _service.Delete(id);
    }

    [HttpGet("{userID}/allTasks")]
    public async Task<IEnumerable<UserTask>> GetUserTasks(long userID)
    {
        return await _service.IncludeUserTasks(userID);
    }
}