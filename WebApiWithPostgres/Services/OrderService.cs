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

    public Task<Order?> GetOrderByIdAsync(int id)
    {
        return _repository.GetOrderByIdAsync(id);
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
}
