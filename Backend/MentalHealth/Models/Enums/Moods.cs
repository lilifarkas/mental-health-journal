using System.ComponentModel;

namespace MentalHealth.Models.Enums;

public enum Moods
{
    [Description("Very negative mood: " +
                 "This could include emotions such as despair, hopelessness, and extreme sadness. " +
                 "In terms of the circumplex model, this would be characterized by a strongly negative valence and relatively low arousal.")]
    VeryNegative,
    [Description("Mildly negative mood: " +
                 "This could include emotions such as disappointment, frustration, and mild sadness. " +
                 "In terms of the circumplex model, this would be characterized by a somewhat negative valence and relatively low arousal.")]
    MildlyNegative,
    [Description("Neutral mood: " +
                 "This could include emotions such as calmness, contentment, and a lack of strong emotion. " +
                 "In terms of the circumplex model, this would be characterized by a neutral valence and relatively low arousal." )]
    Neutral,
    [Description("Mildly positive mood: " +
                 "This could include emotions such as satisfaction, pleasure, and mild happiness. " +
                 "In terms of the circumplex model, this would be characterized by a somewhat positive valence and relatively low to moderate arousal." )]
    MildlyPositive,
    [Description("Very positive mood: " +
                 "This could include emotions such as joy, elation, and excitement. " +
                 "In terms of the circumplex model, this would be characterized by a strongly positive valence and relatively high arousal." )]
    VeryPositive
}