using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Repositories;

public interface IOrderListRepository
{
    Task<IEnumerable<OrderList>> GetOrdersAsync();
    Task<PaginatedList<OrderList>> GetOrdersPaginatedAsync(int page, int pageSize, string searchText);
    Task<OrderList> CreateOrderAsync(OrderList order);

    Task<OrderList?> UpdateOrderAsync(int id, OrderList order);
    Task<bool> DeleteOrderAsync(int id);
    Task<OrderList?> GetOrdersPaginatedAsync(int id);
}
