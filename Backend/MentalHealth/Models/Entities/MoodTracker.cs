using System.ComponentModel.DataAnnotations.Schema;
using MentalHealth.Models.Enums;

namespace MentalHealth.Models.Entities
{
	public class MoodTracker
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long ID { get; set; }
		public Moods Description { get; set; }
	}
}
