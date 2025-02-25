using Microsoft.AspNetCore.Mvc;
using WebApiWithPostgres.Models;
using System.Linq;
using WebApiWithPostgres.Data;
using WebApiWithPostgres.Models;

[Route("api/products")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly AppDbContext _context;
    public ProductController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetProducts(int page = 1, int pageSize = 10)
    {
        var products = _context.Products
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(products);
    }


    [HttpPost]
    public async Task<IActionResult> AddProduct([FromBody] Product product)
    {
        if (product == null) return BadRequest("Dữ liệu không hợp lệ");

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return Ok(product);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        var product = _context.Products.Find(id);
        if (product == null)
        {
            return NotFound("Sản phẩm không tồn tại!");
        }

        _context.Products.Remove(product);
        _context.SaveChanges();
        return Ok("Xóa thành công!");
    }


}
