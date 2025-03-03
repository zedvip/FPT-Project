using Microsoft.EntityFrameworkCore;
using WebApiWithPostgres.Models;
using WebApiWithPostgres.Models;


namespace WebApiWithPostgres.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<OrderList> Orderlist { get; set; }

    public DbSet<Product> Products { get; set; }


    public DbSet<Order> Orders { get; set; } // 🔥 Thêm DbSet<Order>
    public DbSet<OrderItem> OrderItems { get; set; } // 🔥 Thêm DbSet<OrderItem>

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // 🔥 Cấu hình quan hệ giữa Order và OrderItem
        modelBuilder.Entity<Order>()
            .HasMany(o => o.Items)
            .WithOne()
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade); // Xóa Order thì xóa luôn OrderItems
    }

}
