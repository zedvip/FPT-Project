using Microsoft.EntityFrameworkCore;
using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Order> Orders { get; set; }
}
