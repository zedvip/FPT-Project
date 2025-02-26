using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiWithPostgres.Data;
using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        // Lấy danh sách đơn hàng
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _context.Orders.Include(o => o.Items).ToListAsync();
            return Ok(orders);
        }

        // Tạo đơn hàng mới
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] Order order)
        {
            if (order == null || order.Items == null || order.Items.Count == 0)
            {
                return BadRequest("Đơn hàng không hợp lệ.");
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Đặt hàng thành công!", orderId = order.Id });
        }


        // Xóa đơn hàng
        [HttpDelete("{id}")]  // Đúng với route
        public async Task<IActionResult> DeleteOrder(int id)  // Đổi từ orderId -> id
        {
            var order = await _context.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);
            if (order == null) return NotFound("Không tìm thấy đơn hàng!");

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa đơn hàng thành công!" });
        }

        [HttpDelete]
        [Route("deleteAll")]
        public async Task<IActionResult> DeleteAllOrders()
        {
            // Xóa tất cả dữ liệu liên quan trước
            _context.OrderItems.RemoveRange(_context.OrderItems);
            await _context.SaveChangesAsync();

            // Sau đó xóa Orders
            _context.Orders.RemoveRange(_context.Orders);
            await _context.SaveChangesAsync();

            return NoContent();
        }




    }
}
