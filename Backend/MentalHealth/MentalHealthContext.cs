using MentalHealth.Models.Entities;
using MentalHealth.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth;

public class MentalHealthContext : DbContext
{
    public DbSet<MoodTracker> MoodTracker { get; set; }
    public DbSet<UserTask> UserTasks { get; set; }
    
    public DbSet<DefaultTask> DefaultTasks { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Tree> Trees { get; set; }
    public MentalHealthContext(DbContextOptions<MentalHealthContext> options): base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        long id = 1;
        MoodTracker[] moodTrackers =
        {
            new MoodTracker { ID = id++, Description = Moods.VeryNegative },
            new MoodTracker { ID = id++, Description = Moods.MildlyNegative }, new MoodTracker { ID = id++, Description = Moods.Neutral },
            new MoodTracker { ID = id++, Description = Moods.MildlyPositive }, new MoodTracker { ID = id++, Description = Moods.VeryPositive }
        };
        long taskId = 1;
        DefaultTask[] defaultTasks =
        {
            new DefaultTask { ID = taskId++, Name = "Daily1", Description = "Take a walk in nature", Point = 50},
            new DefaultTask { ID = taskId++, Name = "Daily2", Description = "Clean up the floors in every room", Point = 50},
            new DefaultTask { ID = taskId++, Name = "Daily3", Description = "Do an hour full body workout", Point = 100}
        };
        modelBuilder.Entity<MoodTracker>().HasData(moodTrackers); 
        modelBuilder.Entity<DefaultTask>().HasData(defaultTasks);
    }
}