using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiWithPostgres.Data;
using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        // API lấy danh sách đơn hàng
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .Select(o => new
                {
                    o.Id,
                    o.CustomerName,
                    o.Address,
                    o.PhoneNumber,
                    o.Date,
                    o.TotalPrice, 
                    Items = o.Items.Select(i => new
                    {
                        i.ProductId,
                        i.Quantity,
                        i.Price
                    }).ToList()
                })
                .ToListAsync();

            return Ok(orders);
        }


        // API đặt hàng
        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] Order order)
        {
            if (order == null || order.Items == null || order.Items.Count == 0)
            {
                return BadRequest(new { success = false, message = "Giỏ hàng trống!" });
            }

            List<string> outOfStockItems = new List<string>();

            // Kiểm tra tồn kho
            foreach (var item in order.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null || product.Stock < item.Quantity)
                {
                    outOfStockItems.Add($"Sản phẩm {item.ProductId} không đủ hàng!");
                }
            }

            if (outOfStockItems.Count > 0)
            {
                return BadRequest(new { success = false, message = string.Join("\n", outOfStockItems) });
            }

            // Tạo đơn hàng mới
            var newOrder = new Order
            {
                CustomerName = order.CustomerName,
                Address = order.Address,
                PhoneNumber = order.PhoneNumber,
                Date = DateTime.UtcNow,
                TotalPrice = order.Items.Sum(i => i.Quantity * i.Price), 
                Items = new List<OrderItem>()
            };

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync(); // Lưu để có ID đơn hàng

            // Lưu OrderItems và giảm số lượng sản phẩm
            foreach (var item in order.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product != null)
                {
                    product.Stock -= item.Quantity;
                }

                var orderItem = new OrderItem
                {
                    OrderId = newOrder.Id, // Đảm bảo OrderId được gán đúng
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = item.Price
                };

                _context.OrderItems.Add(orderItem); // Thêm vào database
            }

            await _context.SaveChangesAsync(); // Lưu đơn hàng và cập nhật sản phẩm

            return Ok(new { success = true, message = "Đơn hàng đã được tạo!", orderId = newOrder.Id });
        }
    }
}