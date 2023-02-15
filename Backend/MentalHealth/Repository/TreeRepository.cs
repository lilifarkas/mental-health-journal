using MentalHealth.Models.Entities;
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
        await _context.Trees.AddAsync(entity);
    }

    public Task<Tree> Get(long id)
    {
        return Task.FromResult(_context.Trees.First(tree => tree.ID == id));
    }

    public Task<IEnumerable<Tree>> GetAll()
    {
        return Task.FromResult(_context.Trees);
    }

    public Task Update(long id, Tree entity)
    {
        var tree = _context.Trees.First(tree => tree.ID == id);
        tree.Name = entity.Name;
        tree.Progress = entity.Progress;
        return Task.CompletedTask;
    }

    public Task Delete(long id)
    {
        var tree = _context.Trees.First(tree => tree.ID == id);
        _context.Trees.Remove(tree);
        return Task.CompletedTask;
    }
}