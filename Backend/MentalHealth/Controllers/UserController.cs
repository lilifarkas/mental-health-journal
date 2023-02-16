using Backend.Model;
using Backend.Model.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController, Route("/user")]
public class UserController: ControllerBase
{
    private readonly UserContext _context;

    public UserController(UserContext context)
    {
        _context = context;
    }

    [HttpGet("/user/{id}")]
    public async Task<User?> GetUserById(long id)
    {
        return await _context.GetUserById(id);
    }

    [HttpPost("/user/add")]
    public async Task<User> AddNewUser([FromBody] User user)
    {
        return await _context.AddUser(user);
    }
}