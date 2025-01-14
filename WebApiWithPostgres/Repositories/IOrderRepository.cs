using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Repositories;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetOrdersAsync();
}
