using System.Collections.Generic;
using System.Threading.Tasks;
using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace MentalHealth.Controllers
{
	[Authorize]
	[ApiController, Route("/mood")]
	public class MoodController : ControllerBase
	{
		private readonly MoodTrackerService _repository;

		public MoodController(MoodTrackerService repository)
		{
			_repository = repository;
		}

		[HttpPost]
		public async Task<MoodTracker> AddNew([FromBody] MoodTracker newMoodTracker)
		{
			await _repository.Add(newMoodTracker);
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
