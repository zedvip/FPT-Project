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

    public Task<IEnumerable<Order>> GetOrdersAsync() => _repository.GetOrdersAsync();
}
