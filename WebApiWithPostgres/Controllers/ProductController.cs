using Microsoft.AspNetCore.Mvc;
using WebApiWithPostgres.Models;

using WebApiWithPostgres.Data;


[Route("api/products")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly AppDbContext _context;
    public ProductController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("paged")]
    public IActionResult GetPagedProducts(string? searchText = "", int page = 1, int pageSize = 10)
    {
        var query = _context.Products.AsQueryable();

        // Lọc theo tên sản phẩm nếu có searchText
        if (!string.IsNullOrWhiteSpace(searchText))
        {
            query = query.Where(p => p.Name.Contains(searchText));
        }

        var totalProducts = query.Count();
        var products = query
            .OrderBy(p => p.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var response = new
        {
            TotalItems = totalProducts,
            TotalPages = (int)Math.Ceiling((double)totalProducts / pageSize),
            CurrentPage = page,
            PageSize = pageSize,
            Products = products
        };

        return Ok(response);
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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
    {
        if (id != product.Id)
        {
            return BadRequest("ID sản phẩm không khớp!");
        }

        var existingProduct = await _context.Products.FindAsync(id);
        if (existingProduct == null)
        {
            return NotFound("Sản phẩm không tồn tại!");
        }

        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        existingProduct.Image = product.Image;
        existingProduct.Stock = product.Stock;

        await _context.SaveChangesAsync();
        return Ok(existingProduct);
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        var product = _context.Products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound("Sản phẩm không tồn tại!");
        }

        _context.Products.Remove(product);
        _context.SaveChanges();
        return Ok(new { message = "Xóa thành công!" });
    }



}
