using MentalHealth.Models.Entities;

namespace MentalHealth.Service;

public class MoodTrackerService : IService<MoodTracker>
{
    public Task AddToDb(MoodTracker task)
    {
        throw new NotImplementedException();
    }

    public Task<MoodTracker> GetFromDb(long id)
    {
        throw new NotImplementedException();
    }

    public Task<List<MoodTracker>> GetAllFromDb()
    {
        throw new NotImplementedException();
    }

    public Task UpdateInDb(MoodTracker task)
    {
        throw new NotImplementedException();
    }

    public Task DeleteFromDb(long id)
    {
        throw new NotImplementedException();
    }
}