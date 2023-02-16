using MentalHealth.Models.Entities;
using MentalHealth.Repository;

namespace MentalHealth.Service;

public class UserService : IService<User>
{
    private readonly UserRepository _repository;

    public UserService(UserRepository repository)
    {
        _repository = repository;
    }

    public async Task AddToDb(User user)
    {
        await _repository.Add(user);
    }
    public async Task<User> GetFromDb(long id)
    {
        return await _repository.Get(id);
    }

    public async Task<List<User>> GetAllFromDb()
    {
        var users = await _repository.GetAll();
        return users.ToList();
    }

    public async Task UpdateInDb(User task)
    {
        await _repository.Update(task);
    }

    public async Task DeleteFromDb(long id)
    {
        await _repository.Delete(id);
    }
    
    public async Task<List<UserTask>> TasksForUser(long id)
    {
        var user = await _repository.IncludeUserTasks(id);
        return user.UserTasks.ToList();
    }

    public async Task AddTaskToUser(long id, UserTask task)
    {
        await _repository.AddTask(id, task);
    }
}