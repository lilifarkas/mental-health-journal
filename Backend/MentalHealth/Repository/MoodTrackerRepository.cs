using System.Collections.Generic;
using System.Threading.Tasks;
using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth.Repository
{
	public class MoodTrackerRepository : IRepository<MoodTracker>
	{
		private readonly MentalHealthContext _context;

		public MoodTrackerRepository(MentalHealthContext context)
		{
			_context = context;
		}

		public async Task<MoodTracker> Add(MoodTracker entity)
		{
			_context.MoodTracker.Add(entity);
			await _context.SaveChangesAsync();
			return entity;
		}

		public async Task<MoodTracker> Get(long id)
		{
			return await _context.MoodTracker.FindAsync(id);
		}

		public async Task<IEnumerable<MoodTracker>> GetAll()
		{
			return await _context.MoodTracker.ToListAsync();
		}

		public async Task<MoodTracker> Update(long id, MoodTracker entity)
		{
			throw new NotImplementedException();
		}

		public async Task<MoodTracker> Delete(long id)
		{
			throw new NotImplementedException();
		}
	}
}
