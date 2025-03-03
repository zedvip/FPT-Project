namespace WebApiWithPostgres.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } 
        public string Address { get; set; }      
        public string PhoneNumber { get; set; }  
        public DateTime Date { get; set; }
        public decimal TotalPrice { get; set; }
        public List<OrderItem> Items { get; set; }
    }
}
