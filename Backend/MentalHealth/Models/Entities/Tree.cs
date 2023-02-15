using System.ComponentModel.DataAnnotations.Schema;
using MentalHealth.Models.Enums;

namespace MentalHealth.Models.Entities;

public class Tree
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; }
    public string Name { get; set; }
    public User Owner { get; }
    public TreeType Type { get; set; }
    public int Progress { get; set; }

    public Tree(string name, User owner, TreeType type)
    {
        Name = name;
        Owner = owner;
        Type = type;
        Progress = 0;
    }
}