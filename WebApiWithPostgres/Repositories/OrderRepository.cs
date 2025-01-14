using Microsoft.EntityFrameworkCore;
using WebApiWithPostgres.Data;
using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Order>> GetOrdersAsync()
    {
        return await _context.Orders.ToListAsync();
    }
}
