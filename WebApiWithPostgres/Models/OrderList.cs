namespace WebApiWithPostgres.Models;

public class OrderList
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public string CustomerName { get; set; }
    public string PhoneNumber { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }

    public decimal Total => Quantity * Price;
}
