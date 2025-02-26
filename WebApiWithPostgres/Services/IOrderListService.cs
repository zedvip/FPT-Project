using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Services;

public interface IOrderListService
{
    Task<IEnumerable<OrderList>> GetOrdersAsync(int id);
    Task<PaginatedList<OrderList>> GetOrdersPaginatedAsync(int page, int pageSize, string? searchText);
    Task<OrderList> CreateOrderAsync(OrderList order);
    Task<OrderList?> UpdateOrderAsync(int id, OrderList order);
    Task<bool> DeleteOrderAsync(int id);
    Task<OrderList?> GetOrderByIdAsync(int id);
}

