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
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                user.Name = entity.Name;
                user.Password = entity.Password;
                user.Email = entity.Email;
                user.Points = entity.Points;

                await _context.SaveChangesAsync();
            }
        }
    }

    public async Task Delete(long id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}