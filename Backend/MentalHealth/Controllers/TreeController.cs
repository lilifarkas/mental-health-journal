using System.Collections.Generic;
using System.Threading.Tasks;
using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[ApiController, Route("/tree")]
public class TreeController : ControllerBase
{
    public TreeController(TreeRepository repository)
    {
        _repository = repository;
    }

    private readonly IRepository<Tree> _repository;
    
    [HttpGet]
    public async Task<IEnumerable<Tree>> GetAllTrees()
    {
        return await _repository.GetAll();
    }

    [HttpPost]
    public async Task AddTree([FromBody] Tree tree)
    {
        await _repository.Add(tree);
    }

    [HttpGet("/{id}")]
    public async Task<Tree> GetTreeById(long id)
    {
        return await _repository.Get(id);
    }

    [HttpPut("/{id}")]
    public void UpdateTreeById([FromBody] Tree updatedTree)
    {
        _repository.Update(updatedTree);
    }

    [HttpDelete("/{id}")]
    public async Task DeleteTreeById(long id)
    {
        await _repository.Delete(id);
    }
}



    
    
