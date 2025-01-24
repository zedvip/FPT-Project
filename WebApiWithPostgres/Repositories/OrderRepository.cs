using WebApiWithPostgres.Models;
using Microsoft.EntityFrameworkCore;
using WebApiWithPostgres.Data;

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

    public async Task<PaginatedList<Order>> GetOrdersPaginatedAsync(int page, int pageSize, string? searchText)
    {
        // Tạo query cơ bản
        var query = _context.Orders.AsQueryable();

        // Áp dụng bộ lọc nếu có searchText
        if (!string.IsNullOrEmpty(searchText))
        {
           query = query.Where(o =>
    EF.Functions.Like(o.CustomerName, $"%{searchText}%") ||
    EF.Functions.Like(o.ProductName, $"%{searchText}%") ||
    EF.Functions.Like(o.PhoneNumber, $"%{searchText}%"));

        }

        // Sử dụng PaginatedList để phân trang
        return await PaginatedList<Order>.CreateAsync(query, page, pageSize, searchText);
    }



    public async Task<Order> CreateOrderAsync(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<Order?> UpdateOrderAsync(int id, Order order)
    {
        var existingOrder = await _context.Orders.FindAsync(id);
        if (existingOrder == null) return null;

        existingOrder.CustomerName = order.CustomerName;
        existingOrder.PhoneNumber = order.PhoneNumber;
        existingOrder.ProductName = order.ProductName;
        existingOrder.Quantity = order.Quantity;
        existingOrder.Price = order.Price;
        existingOrder.OrderDate = order.OrderDate;

        await _context.SaveChangesAsync();
        return existingOrder;
    }   

    public async Task<bool> DeleteOrderAsync(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return false;

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return true;
    }

    public Task<Order?> GetOrdersPaginatedAsync(int id)
    {
        throw new NotImplementedException();
    }
}
