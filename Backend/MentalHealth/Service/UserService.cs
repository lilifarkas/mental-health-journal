using MentalHealth.Models.Entities;
using MentalHealth.Repository;

namespace MentalHealth.Service;

public class UserService
{
    private readonly UserRepository _repository;

    public UserService(UserRepository repository)
    {
        _repository = repository;
    }

    public async Task AddUser(User user)
    {
        await _repository.Add(user);
    }
    public async Task<User> GetUser(long id)
    {
        return await _repository.Get(id);
    }

    public async Task<IEnumerable<User>> AllUsers()
    {
        return await _repository.GetAll();
    }

    public async Task UpdateUser(User task)
    {
        await _repository.Update(task);
    }

    public async Task DeleteUser(long id)
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