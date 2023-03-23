using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth.Repository;

public class TaskService : IService<UserTask>
{
    private readonly MentalHealthContext _context;

    public TaskService(MentalHealthContext context)
    {
        _context = context;
    }

    public async Task Add(UserTask entity)
    {
            await _context.UserTasks.AddAsync(entity);
            await _context.SaveChangesAsync();
    }

    public async Task<UserTask?> Get(long id)
    {
        return await _context.UserTasks.FirstOrDefaultAsync(task => task.ID == id);
    }

    public async Task<IEnumerable<UserTask>> GetAll()
    {

            return await _context.UserTasks.ToListAsync();
    }

    public async Task Update(UserTask entity)
    {
        var task = await Get(entity.ID);
            if (task != null)
            {
                _context.UserTasks.Entry(task).CurrentValues.SetValues(entity);
                await _context.SaveChangesAsync();
            }
    }
    
    public async Task Start(long taskId)
    {
        var task = await Get(taskId);
        if (task != null)
        {
            task.Status = "In progress";
            task.DueDate = DateTime.Now.AddHours(1);
            await _context.SaveChangesAsync();
        }
    }

    public async Task Delete(long id)
    {
        var task = await Get(id);
            if (task != null)
            {
                _context.UserTasks.Remove(task);
                await _context.SaveChangesAsync();
            }
    }
    
}