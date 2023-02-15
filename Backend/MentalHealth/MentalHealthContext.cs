using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth;

public class MentalHealthContext : DbContext
{
    public DbSet<MoodTracker> MoodTracker { get; set; }
	public MentalHealthContext(DbContextOptions<MentalHealthContext> options) : base(options)
	{
	}
}