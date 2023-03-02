using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace MentalHealth.Repository;

public class TreeService : IService<Tree>
{
    public TreeService(MentalHealthContext context)
    {
        _context = context;
    }

    private readonly MentalHealthContext _context;
    
    public async Task Add(Tree entity)
    {

            await _context.Trees.AddAsync(entity);
            await _context.SaveChangesAsync();
    }

    public async Task<Tree> Get(long id)
    {
        return await _context.Trees.FindAsync(id);
    }
    
    public async Task<IEnumerable<Tree>> GetByUser(long id)
    {
        await using (_context)
        {
            return await _context.Trees.Where(tree => tree.OwnerId == id).ToListAsync();
        }
    }

    public async Task<IEnumerable<Tree>> GetAll()
    {

            return await _context.Trees.ToListAsync();
        
    }
    
    public async Task Update(Tree entity)
    {
        var task = await Get(entity.ID);
            _context.Trees.Entry(task).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();

    }

    public async Task Delete(long id)
    {
        var task = await Get(id);
            if (task != null)
            {
                _context.Trees.Remove(task);
                await _context.SaveChangesAsync();
            }

    }

    public void ProgressTree(long userId)
    {
        var userPoints = _context.Users
            .Where(u => u.ID == userId)
            .Select(u => u.Points)
            .FirstOrDefault();
        
        int[] progressThresholds = new int[] { 0, 50, 200, 500, 1000 };
        
        int currentProgress = _context.Trees
            .Where(t => t.OwnerId == userId)
            .Select(t => t.Progress)
            .FirstOrDefault();

        int nextProgress = currentProgress;
        for (int i = currentProgress; i < progressThresholds.Length; i++)
        {
            if (userPoints >= progressThresholds[i])
            {
                nextProgress = i + 1;
            }
            else
            {
                break;
            }
        }

        if (nextProgress != currentProgress)
        {
            var tree = _context.Trees
                .FirstOrDefault(t => t.OwnerId == userId);

            if (tree != null)
            {
                _context.Trees.Attach(tree);
                tree.Progress = nextProgress;
                _context.SaveChanges();
            }
        }
    }
}