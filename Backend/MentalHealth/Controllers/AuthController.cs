using MentalHealth.Models.DTOs;
using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[Route("/welcome")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserService _service;
    public static User? User = new User();
    
    public AuthController(UserService service)
    {
        _service = service;
    }
    
    [HttpPost("/register")]
    public async Task<ActionResult<User>> Register([FromBody] RegisterDTO registerDto)
    {
        User.Name = registerDto.Name;
        User.Email = registerDto.Email;
        User.Password = registerDto.Password;
        
        await _service.Add(User);
        return Ok(User);
    }

}