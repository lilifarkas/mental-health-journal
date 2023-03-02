using System.Collections.Generic;
using System.Threading.Tasks;
using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[ApiController, Route("/tree")]
public class TreeController : Controller
{
    private readonly TreeService _treeService;
    public TreeController(TreeService treeService)
    {
        _treeService = treeService;
    }

    
    [HttpGet]
    public async Task<IEnumerable<Tree>> GetAllTrees()
    {
        return await _treeService.GetAll();
    }

    [HttpPost]
    public async Task AddTree([FromBody] Tree tree)
    {
        await _treeService.Add(tree);
    }

    [HttpGet("/tree/{id}")]
    public async Task<Tree> GetTreeById(long id)
    {
        return await _treeService.Get(id);
    }
    
    [HttpGet("/tree/user{id}")]
    public async Task<IEnumerable<Tree>> GetTreesByUserId(long id)
    {
        _treeService.ProgressTree(id);
        return await _treeService.GetByUser(id);
    }

    [HttpPut("/tree/{id}")]
    public void UpdateTreeById([FromBody] Tree updatedTree)
    {
        _treeService.Update(updatedTree);
    }

    [HttpDelete("/tree/{id}")]
    public async Task DeleteTreeById(long id)
    {
        await _treeService.Delete(id);
    }
}



    
    
