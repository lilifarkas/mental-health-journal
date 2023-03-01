using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MentalHealth.Models.DTOs;
using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace MentalHealth.Controllers;

[Route("/welcome")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserService _service;
    private readonly IConfiguration _configuration;
    public static User? User = new User();
    
    public AuthController(UserService service, IConfiguration configuration)
    {
        _service = service;
        _configuration = configuration;
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

    [HttpPost("/login")]
    public async Task<ActionResult<User>> Login([FromBody] LoginDTO loginDto)
    {
        var user = await _service.GetByLogin(loginDto.Email, loginDto.Password);
        if (user != null)
        {
            string token = CreateToken(user);
            return Ok(token);
        }

        return BadRequest("Email or password is incorrect");
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };
        
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}