using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace MentalHealth.Repository;

public class TreeRepository : IRepository<Tree>
{
    public TreeRepository(MentalHealthContext context)
    {
        _context = context;
    }

    private readonly MentalHealthContext _context;
    
    public async Task Add(Tree entity)
    {
        await using (_context)
        {
            await _context.Trees.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<Tree> Get(long id)
    {
        await using (_context)
        {
            return await _context.Trees.FindAsync(id);
        }
    }

    public async Task<IEnumerable<Tree>> GetAll()
    {
        await using (_context)
        {
            return await _context.Trees.ToListAsync();
        }
    }
    
    public async Task Update(Tree entity)
    {
        await using (_context)
        {
            var task = await Get(entity.ID);
            _context.Trees.Entry(task).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task Delete(long id)
    {
        await using (_context)
        {
            var task = await Get(id);
            if (task != null)
            {
                _context.Trees.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
    }
}