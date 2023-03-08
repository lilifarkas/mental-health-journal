using MentalHealth.Models.DTOs;
using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth.Repository;

public class UserService : IService<User>
{
    private readonly MentalHealthContext _context;
    private readonly TaskService _service;
    public UserService(MentalHealthContext context, TaskService service)
    {
        _context = context;
        _service = service;
    }
    
    public async Task Add(User entity)
    {
        await _context.Users.AddAsync(entity);
            await _context.SaveChangesAsync();
    }

    public async Task<User?> Get(long id)
    {

        return await _context.Users.Include(u => u.Moods).FirstAsync(x => x.ID == id);


    }

    public async Task<IEnumerable<User>> GetAll()
    {
        return await _context.Users.ToListAsync();
        
    }
    
    public async Task Update(User entity)
    {
        var user = await _context.Users.FindAsync(entity.ID);
            if (user != null)
            {
                user.Name = entity.Name;
                user.Password = entity.Password;
                user.Email = entity.Email;
                user.Points = entity.Points;

                await _context.SaveChangesAsync();
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

    public async Task UpdateWithNewMood(User user, MoodTracker mood)
    {
        user.Moods.Add(mood);
        await _context.SaveChangesAsync();
    }
    
    public async Task<List<UserTask>> IncludeUserTasks(long id)
    {
        return await _context.UserTasks.Where(task => task.Users.Any(user => user.ID == id)).ToListAsync();
    }

    public async Task<User?> GetByLogin(string email, string password)
    {
        return await _context.Users.FirstOrDefaultAsync(user => user.Email == email && user.Password == password);
    }

    public async Task AddTask( UserTask task, long userID)
    {
        var user = await Get(userID);
        user.UserTasks.Add(task);
        await _context.SaveChangesAsync();
    }
    
    public async Task<bool> UserExistsByEmail(string email)
    {
        return await _context.Users.AnyAsync(user => user.Email == email);
    }
    
    public async Task<User?> AuthenticateAdmin(string email, string password)
    {
        if (email == "admin@admin.com" && password == "admin")
        {
            return new User { Name = "Admin", Password = password, Email = email, Points = 0, Role = "Admin" };
        }

        return null;
    }
}