using MentalHealth.Models.DTOs;
using MentalHealth.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth.Repository;

public class UserService : IService<User>
{
    private readonly MentalHealthContext _context;
    private readonly TaskService _service;
    private readonly PasswordHasher<User> _passwordHasher;
    public UserService(MentalHealthContext context, TaskService service, PasswordHasher<User> passwordHasher)
    {
        _context = context;
        _service = service;
        _passwordHasher = passwordHasher;
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
                user.Role = entity.Role;
                await _context.SaveChangesAsync();
            }

    }
    
    public async Task UpdatePoint(long id, int point)
    {
        var user = await _context.Users.FindAsync(id);
        if (user != null)
        {
            user.Points += point;

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
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        if (user != null)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            if (result == PasswordVerificationResult.Success)
            {
                return user;
            }
            return null;
        }
        return null;
    }

    public async Task AddTask( UserTask task, long userID)
    {
        var user = await Get(userID);
        user.UserTasks.Add(task);
        await _context.SaveChangesAsync();
    }
    
    public async Task AddMood( MoodTracker mood, long userID)
    {
        var user = await Get(userID);
        user.Moods.Add(mood);
    }
    
    public async Task AddDefault(long userId)
    {
        await foreach (var defaultTask in _context.DefaultTasks)
        {
            var task = new UserTask
            {
                UserId = userId,
                Description = defaultTask.Description,
                Point = defaultTask.Point,
                Status = "Not started",
                DueDate = DateTime.Now.AddHours(1)
            };
            await AddTask(task,userId);
        }

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