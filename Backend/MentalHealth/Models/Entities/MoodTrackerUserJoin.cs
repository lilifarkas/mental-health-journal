using System.ComponentModel.DataAnnotations.Schema;

namespace MentalHealth.Models.Entities;

public class MoodTrackerUserJoin
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; set; }
    public long MoodTrackerID { get; set; }
    public MoodTracker MoodTracker { get; set; }
    public long UserID { get; set; }
    public User User;
    public DateTime CreateDate { get; set; }
}