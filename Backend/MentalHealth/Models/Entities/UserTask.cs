using System.ComponentModel.DataAnnotations.Schema;

namespace MentalHealth.Models.Entities;

public class UserTask
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; set; }
    public long UserId { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public int Point { get; set; }
    public string Status { get; set; }
    
    public virtual ICollection<User>? Users { get; set; }
}