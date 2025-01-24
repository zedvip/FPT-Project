using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Services;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetOrdersAsync(int id);
    Task<PaginatedList<Order>> GetOrdersPaginatedAsync(int page, int pageSize, string? searchText);
    Task<Order> CreateOrderAsync(Order order);
    Task<Order?> UpdateOrderAsync(int id, Order order);
    Task<bool> DeleteOrderAsync(int id);
    Task<Order?> GetOrderByIdAsync(int id);
}

