using WebApiWithPostgres.Models;
using WebApiWithPostgres.Repositories;

namespace WebApiWithPostgres.Services;

public class OrderListService : IOrderListService
{
    private readonly IOrderListRepository _repository;

    public OrderListService(IOrderListRepository repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<OrderList>> GetOrdersAsync()
    {
        return _repository.GetOrdersAsync();
    }

   public async Task<PaginatedList<OrderList>> GetOrdersPaginatedAsync(int page, int pageSize,string? searchText)
{
        var ordersList = await _repository.GetOrdersPaginatedAsync(page, pageSize, searchText);
        ordersList.Items = ordersList.Items.OrderBy(x => x.Id).ToList();
        return ordersList;
}


    public Task<OrderList> CreateOrderAsync(OrderList order)
    {
        return _repository.CreateOrderAsync(order);
    }

    public Task<OrderList?> UpdateOrderAsync(int id, OrderList order)
    {
        return _repository.UpdateOrderAsync(id, order);
    }

    public Task<bool> DeleteOrderAsync(int id)
    {
        return _repository.DeleteOrderAsync(id);
    }

    Task<IEnumerable<OrderList>> IOrderListService.GetOrdersAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<OrderList?> GetOrderByIdAsync(int id)
    {
        throw new NotImplementedException();
    }
}
