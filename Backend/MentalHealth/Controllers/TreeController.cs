using System.Collections.Generic;
using System.Threading.Tasks;
using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[ApiController, Route("/tree")]
public class TreeController : Controller
{
    public TreeController(IRepository<Tree> treeRepository)
    {
        _treeRepository = treeRepository;
    }

    private readonly IRepository<Tree> _treeRepository;
    
    [HttpGet]
    public async Task<List<Tree>> GetAllTrees()
    {
        return await _treeRepository.GetAll();
    }

    [HttpPost]
    public async Task AddTree([FromBody] Tree tree)
    {
        await _treeRepository.Add(tree);
    }

    [HttpGet("/{id}")]
    public async Task<Tree> GetTreeById(long id)
    {
        return await _treeRepository.Get(id);
    }

    [HttpPut("/{id}")]
    public void UpdateTreeById(long id, [FromBody] Tree updatedTree)
    {
        _treeRepository.Update(id,updatedTree);
    }

    [HttpDelete("/{id}")]
    public async Task DeleteTreeById(long id)
    {
        await _treeRepository.Delete(id);
    }
}



    
    
