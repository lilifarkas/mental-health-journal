using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth;

public class MentalHealthContext : DbContext
{
    public DbSet<UserTask> UserTasks { get; set; }
    public DbSet<User> Users { get; set; }
    
    public MentalHealthContext(DbContextOptions<MentalHealthContext> options): base(options)
    {
        
    }
}