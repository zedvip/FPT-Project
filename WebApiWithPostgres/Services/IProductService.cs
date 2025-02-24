using System.Collections.Generic;
using System.Threading.Tasks;
using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<Product?> GetProductById(int id);
        Task<Product> AddProduct(Product product);
        Task<Product?> UpdateProduct(int id, Product product);
        Task<bool> DeleteProduct(int id);
    }
}
