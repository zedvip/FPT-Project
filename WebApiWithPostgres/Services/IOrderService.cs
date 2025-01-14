using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Services;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetOrdersAsync();
}
