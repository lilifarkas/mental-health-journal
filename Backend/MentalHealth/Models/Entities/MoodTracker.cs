using System.ComponentModel.DataAnnotations.Schema;

namespace MentalHealth.Models.Entities
{
	public class MoodTracker
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long ID { get; set; }
		public DateTime CreateDate = DateTime.Now;
		public int MoodValue { get; set; }

		public Dictionary<int, string> EmotionsDictionary = new Dictionary<int, string>()
		{
			{1, "Very negative mood: " +
				"This could include emotions such as despair, hopelessness, and extreme sadness. " +
				"In terms of the circumplex model, this would be characterized by a strongly negative valence and relatively low arousal."
			},
			{2, "Mildly negative mood: " +
				"This could include emotions such as disappointment, frustration, and mild sadness. " +
				"In terms of the circumplex model, this would be characterized by a somewhat negative valence and relatively low arousal."
			}, 
			{3, "Neutral mood: " +
				"This could include emotions such as calmness, contentment, and a lack of strong emotion. " +
				"In terms of the circumplex model, this would be characterized by a neutral valence and relatively low arousal." 
			},
			{4, "Mildly positive mood: " +
				"This could include emotions such as satisfaction, pleasure, and mild happiness. " +
				"In terms of the circumplex model, this would be characterized by a somewhat positive valence and relatively low to moderate arousal." 
			},
			{5, "Very positive mood: " +
				"This could include emotions such as joy, elation, and excitement. " +
				"In terms of the circumplex model, this would be characterized by a strongly positive valence and relatively high arousal." 
			},
		};
	}
}
