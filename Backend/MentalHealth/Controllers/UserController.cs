using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[ApiController, Route("/users")]
public class UserController: ControllerBase
{
    private readonly UserRepository _repository;

    public UserController(UserRepository repository)
    {
        _repository = repository;
    }
    
    [HttpPost("/users/add")]
    public async Task AddNewUser([FromBody] User user)
    {
        await _repository.Add(user);
    }
    
    [HttpGet("/users/{id}")]
    public async Task<User?> GetUserById(long id)
    {
        return await _repository.Get(id);
    }
    
    [HttpGet]
    public async Task<IEnumerable<User>> GetAllUser()
    {
        return await _repository.GetAll();
    }
    
    [HttpPut("/users/update/{id}")]
    public async Task UpdateUser(long id, [FromBody] User user)
    {
        await _repository.Update(id, user);
    }
    
    [HttpDelete("/users/delete/{id}")]
    public async Task DeleteUser(long id)
    {
        await _repository.Delete(id);
    }
}