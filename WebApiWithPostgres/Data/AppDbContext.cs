﻿using Microsoft.EntityFrameworkCore;
using WebApiWithPostgres.Models;
using WebApiWithPostgres.Models;

namespace WebApiWithPostgres.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<OrderList> Orderlist { get; set; }

    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    public DbSet<Product> Products { get; set; }


}
