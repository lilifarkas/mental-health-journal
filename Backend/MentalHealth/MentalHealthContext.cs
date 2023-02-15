using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth;

public class MentalHealthContext : DbContext
{
    public DbSet<UserTask> Tasks { get; set; }
    public DbSet<User> Users { get; set; }
    
}