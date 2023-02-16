using System.Collections.Generic;
using System.Threading.Tasks;
using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[ApiController, Route("/tree")]
public class TreeController : Controller
{
    private readonly IRepository<Tree> _treeRepository;
    public TreeController(TreeRepository treeRepository)
    {
        _treeRepository = treeRepository;
    }

    
    [HttpGet]
    public async Task<IEnumerable<Tree>> GetAllTrees()
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
    public void UpdateTreeById([FromBody] Tree updatedTree)
    {
        _treeRepository.Update(updatedTree);
    }

    [HttpDelete("/{id}")]
    public async Task DeleteTreeById(long id)
    {
        await _treeRepository.Delete(id);
    }
}



    
    
