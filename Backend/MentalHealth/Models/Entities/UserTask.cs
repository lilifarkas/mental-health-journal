﻿using System.ComponentModel.DataAnnotations.Schema;

namespace MentalHealth.Models.Entities;

public class UserTask
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; set; }
    public string TaskName { get; set; }
    public bool Complete { get; set; } = false;
    public virtual ICollection<User>? Users { get; set; }
}