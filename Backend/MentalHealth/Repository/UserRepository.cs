using Backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository;

public class UserRepository
{
    public async Task<User?> GetById(long id, DbSet<User?> users)
    {
        return await users.FirstOrDefaultAsync(user => user.ID == id);
    }

    public async Task<User> Add(User user, DbSet<User> users)
    {
        users.Add(user);
        return user;
    }
}