using System.Collections.Generic;
using System.Threading.Tasks;
using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using MentalHealth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace MentalHealth.Controllers
{
	[Authorize]
	[ApiController, Route("/mood")]
	public class MoodController : ControllerBase
	{
		private readonly MoodTrackerService _repository;
		private readonly UserService _userService;

		public MoodController(MoodTrackerService repository, UserService userService)
		{
			_repository = repository;
			_userService = userService;
		}

		[HttpPost("/mood/{id}")]
		public async Task<MoodTracker> AddNew([FromBody] MoodTracker newMoodTracker, long id)
		{
			Console.WriteLine(id);
			await _repository.Add(newMoodTracker);
			var finUserToAddMood = await _userService.Get(id);
			Console.WriteLine(finUserToAddMood.Name);
			Console.WriteLine(newMoodTracker.Description);
			await _userService.UpdateWithNewMood(finUserToAddMood, newMoodTracker);
			return newMoodTracker;
		}

		[HttpGet]
		public async Task<IEnumerable<MoodTracker>> GetAll()
		{
			return await _repository.GetAll();
		}

		[HttpGet("{id}")]
		public async Task<MoodTracker> GetById(long Id)
		{
			return await _repository.Get(Id);
		}
	}
}
