namespace MentalHealth.Repository;

public interface IRepository<T>
{
    public Task<T> Add(T entity);
    public Task<T> Get(long id);
    public Task<IEnumerable<T>> GetAll();
    public Task<T> Update(long id, T entity);
    public Task<T> Delete(long id);
}