using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Repositories;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetOrdersAsync();
    Task<PaginatedList<Order>> GetOrdersPaginatedAsync(int page, int pageSize, string searchText);
    Task<Order> CreateOrderAsync(Order order);

    Task<Order?> UpdateOrderAsync(int id, Order order);
    Task<bool> DeleteOrderAsync(int id);
    Task<Order?> GetOrdersPaginatedAsync(int id);
}
