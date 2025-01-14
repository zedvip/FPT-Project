using Microsoft.AspNetCore.Mvc;
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

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _service.GetOrdersAsync();
        return Ok(orders);
    }
}
