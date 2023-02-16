using MentalHealth.Models.Entities;
using MentalHealth.Repository;

namespace MentalHealth.Service;

public class TaskService
{
    private readonly TaskRepository _repository;

    public TaskService(TaskRepository repository)
    {
        _repository = repository;
    }

    public async Task AddUserTask(UserTask task)
    {
        await _repository.Add(task);
    }
    public async Task<UserTask> GetUserTask(long id)
    {
        return await _repository.Get(id);
    }

    public async Task<IEnumerable<UserTask>> AllUserTasks()
    {
        return await _repository.GetAll();
    }

    public async Task UpdateUserTask(UserTask task)
    {
        await _repository.Update(task);
    }

    public async Task DeleteUserTask(long id)
    {
        await _repository.Delete(id);
    }
}