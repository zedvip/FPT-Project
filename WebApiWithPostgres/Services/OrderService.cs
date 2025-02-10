using WebApiWithPostgres.Models;
using WebApiWithPostgres.Repositories;

namespace WebApiWithPostgres.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _repository;

    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<Order>> GetOrdersAsync()
    {
        return _repository.GetOrdersAsync();
    }

   public async Task<PaginatedList<Order>> GetOrdersPaginatedAsync(int page, int pageSize,string? searchText)
{
        var ordersList = await _repository.GetOrdersPaginatedAsync(page, pageSize, searchText);
        ordersList.Items = ordersList.Items.OrderBy(x => x.Id).ToList();
        return ordersList;
}


    public Task<Order> CreateOrderAsync(Order order)
    {
        return _repository.CreateOrderAsync(order);
    }

    public Task<Order?> UpdateOrderAsync(int id, Order order)
    {
        return _repository.UpdateOrderAsync(id, order);
    }

    public Task<bool> DeleteOrderAsync(int id)
    {
        return _repository.DeleteOrderAsync(id);
    }

    Task<IEnumerable<Order>> IOrderService.GetOrdersAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Order?> GetOrderByIdAsync(int id)
    {
        throw new NotImplementedException();
    }
}
