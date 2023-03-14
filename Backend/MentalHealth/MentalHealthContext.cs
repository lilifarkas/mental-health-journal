using MentalHealth.Models.Entities;
using MentalHealth.Models.Enums;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        long id = 1;
        MoodTracker[] moodTrackers =
        {
            new MoodTracker { ID = id++, Description = Moods.VeryNegative },
            new MoodTracker { ID = id++, Description = Moods.MildlyNegative }, new MoodTracker { ID = id++, Description = Moods.Neutral },
            new MoodTracker { ID = id++, Description = Moods.MildlyPositive }, new MoodTracker { ID = id++, Description = Moods.VeryPositive }
        };
        modelBuilder.Entity<MoodTracker>().HasData(moodTrackers);
    }
}