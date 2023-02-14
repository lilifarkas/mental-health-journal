using MentalHealth.Models.Entities;

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
            await _context.Tasks.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
    }

    public Task<UserTask> Get(long id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<UserTask>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task Update(long id, UserTask entity)
    {
        throw new NotImplementedException();
    }

    public Task Delete(long id)
    {
        throw new NotImplementedException();
    }
}