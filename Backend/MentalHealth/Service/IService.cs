namespace MentalHealth.Service;

public interface IService<T>
{
    public  Task AddToDb(T task);
    public  Task<T> GetFromDb(long id);
    public Task<List<T>> GetAllFromDb();
    public  Task UpdateInDb(T task);
    public Task DeleteFromDb(long id);
}