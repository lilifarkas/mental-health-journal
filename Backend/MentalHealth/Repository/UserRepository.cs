using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth.Repository;

public class UserRepository : IRepository<User>
{
    private readonly MentalHealthContext _context;

    public UserRepository(MentalHealthContext context)
    {
        _context = context;
    }
    
    public async Task Add(User entity)
    {
        using (_context)
        {
            await _context.Users.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<User?> Get(long id)
    {
        using (_context)
        {
            return await _context.Users.FindAsync(id);
        }
    }

    public async Task<IEnumerable<User>> GetAll()
    {
        using (_context)
        {
            return await _context.Users.ToListAsync();
        }
    }

    public async Task Update(long id, User entity)
    {
        using (_context)
        {
            var task = await Get(entity.ID);
            _context.Users.Entry(task).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task Delete(long id)
    {
        using (_context)
        {
            var task = await Get(id);
            if (task != null)
            {
                _context.Users.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
    }
}