using WebApiWithPostgres.Models;
using Microsoft.EntityFrameworkCore;
using WebApiWithPostgres.Data;

namespace WebApiWithPostgres.Repositories;

public class OrderListRepository : IOrderListRepository
{
    private readonly AppDbContext _context;

    public OrderListRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OrderList>> GetOrdersAsync()
    {
        return await _context.Orderlist.ToListAsync();
    }

    public async Task<PaginatedList<OrderList>> GetOrdersPaginatedAsync(int page, int pageSize, string? searchText)
    {
        // Tạo query cơ bản
        var query = _context.Orderlist.AsQueryable();

        // Áp dụng bộ lọc nếu có searchText
        if (!string.IsNullOrEmpty(searchText))
        {
           query = query.Where(o =>
    EF.Functions.Like(o.CustomerName, $"%{searchText}%") ||
    EF.Functions.Like(o.ProductName, $"%{searchText}%") ||
    EF.Functions.Like(o.PhoneNumber, $"%{searchText}%"));

        }

        // Sử dụng PaginatedList để phân trang
        return await PaginatedList<OrderList>.CreateAsync(query, page, pageSize, searchText);
    }



    public async Task<OrderList> CreateOrderAsync(OrderList order)
    {
        _context.Orderlist.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<OrderList?> UpdateOrderAsync(int id, OrderList order)
    {
        var existingOrder = await _context.Orderlist.FindAsync(id);
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
        var order = await _context.Orderlist.FindAsync(id);
        if (order == null) return false;

        _context.Orderlist.Remove(order);
        await _context.SaveChangesAsync();
        return true;
    }

    public Task<OrderList?> GetOrdersPaginatedAsync(int id)
    {
        throw new NotImplementedException();
    }
}
