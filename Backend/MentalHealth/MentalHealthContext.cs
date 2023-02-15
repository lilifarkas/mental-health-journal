using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth;

public class MentalHealthContext : DbContext
{
    public DbSet<MoodTracker> MoodTracker { get; set; }
    public DbSet<UserTask> UserTasks { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Tree> Trees { get; set; }
    public MentalHealthContext(DbContextOptions<MentalHealthContext> options): base(options)
    {
        
    }
}