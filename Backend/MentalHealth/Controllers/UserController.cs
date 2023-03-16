using MentalHealth.Models.DTOs;
using MentalHealth.Models.Entities;
using MentalHealth.Models.Enums;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[Authorize]
[ApiController, Route("/users")]
public class UserController: ControllerBase
{
    private readonly UserService _service;
   
    public UserController(UserService service)
    {
        _service = service;
    }
    
    [HttpGet("/users/{id}")]
    public async Task<User> GetUserById(long id)
    {
        return await _service.Get(id);
    }
    
    [HttpGet]
    public async Task<IEnumerable<User>> GetAllUser()
    {
        return await _service.GetAll();
    }
    
    [HttpPut("/users/update/{id}")]
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

    [HttpPost("{userID}/addTask")]
    public async Task<ActionResult> AddTask( long userID, [FromBody] AddTaskDTO taskDto)
    {
        UserTask task = new UserTask();
        task.TaskName = taskDto.TaskDescription;
        await _service.AddTask(task, userID);
        return Ok();
    }
    
    [HttpPut("{userID}/addMood")]
    public async Task<ActionResult> AddMood( long userID, [FromBody] AddMoodDTO moodDto)
    {
        var user = await _service.Get(userID);
        user.LastMoodDate = moodDto.DateCreated;
        MoodTracker moodTracker = new MoodTracker();
        moodTracker.Description = (Moods)moodDto.MoodValue;
        await _service.Update(user);
        await _service.AddMood(moodTracker, userID);
        return Ok();
    }
}