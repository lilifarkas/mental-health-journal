namespace Backend.Repository;

public interface IRepository<T>
{
    public Task Add(T entity);
    public Task<T> Get(long id);
    public Task<IEnumerable<T>> GetAll();
    public Task Update(long id, T entity);
    public Task Delete(long id);
}