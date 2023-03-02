using System.ComponentModel.DataAnnotations.Schema;
using MentalHealth.Models.Enums;

namespace MentalHealth.Models.Entities;

public class Tree
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; set; }
    public string Name { get; set; }
    public int OwnerId { get; set; }
    public TreeType Type { get; set; }
    public int Progress { get; set; }
    public virtual ICollection<User>? Users { get; set; }
}