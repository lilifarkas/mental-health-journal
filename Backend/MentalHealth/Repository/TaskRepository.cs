using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth.Repository;

public class TaskRepository : IRepository<UserTask>
{
    private readonly MentalHealthContext _context;

    public TaskRepository(MentalHealthContext context)
    {
        _context = context;
    }

    public async Task Add(UserTask entity)
    {
        using (_context)
        {
            await _context.UserTasks.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<UserTask> Get(long id)
    {
        using (_context)
        {
            return await _context.UserTasks.FindAsync(id);
        }
    }

    public async Task<IEnumerable<UserTask>> GetAll()
    {
        using (_context)
        {
            return await _context.UserTasks.ToListAsync();
        }
    }

    public Task Update(UserTask entity)
    {
        throw new NotImplementedException();
    }

    public Task Delete(long id)
    {
        throw new NotImplementedException();
    }
}