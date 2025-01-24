using Microsoft.AspNetCore.Mvc;
using WebApiWithPostgres.Models;
using WebApiWithPostgres.Services;

namespace WebApiWithPostgres.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _service;

    public OrdersController(IOrderService service)
    {
        _service = service;
    }

    // GET: api/orders
    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _service.GetOrdersAsync();
        Task.Delay(500).Wait();

        return Ok(orders);
    }

    // GET: api/orders/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _service.GetOrderByIdAsync(id);
        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }

    // POST: api/orders
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] Order order)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdOrder = await _service.CreateOrderAsync(order);
        return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.Id }, createdOrder);
    }

    // PUT: api/orders/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order order)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedOrder = await _service.UpdateOrderAsync(id, order);

        if (updatedOrder == null)
        {
            return NotFound();
        }

        return Ok(updatedOrder);
    }

    // DELETE: api/orders/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var result = await _service.DeleteOrderAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }


}
