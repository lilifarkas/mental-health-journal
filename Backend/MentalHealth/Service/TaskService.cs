using MentalHealth.Models.Entities;
using MentalHealth.Repository;

namespace MentalHealth.Service;

public class TaskService : IService<UserTask>
{
    private readonly TaskRepository _repository;

    public TaskService(TaskRepository repository)
    {
        _repository = repository;
    }
    public async Task AddToDb(UserTask task)
    {
        await _repository.Add(task);
    }

    public async Task<UserTask> GetFromDb(long id)
    {
        return await _repository.Get(id);
    }

    public async Task<List<UserTask>> GetAllFromDb()
    {
        var userTasks = await _repository.GetAll();
        return userTasks.ToList();
    }

    public async Task UpdateInDb(UserTask task)
    {
        await _repository.Update(task);
    }

    public async Task DeleteFromDb(long id)
    {
        await _repository.Delete(id);
    }
}