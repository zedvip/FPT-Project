using Microsoft.EntityFrameworkCore;
using Npgsql.Replication;

namespace WebApiWithPostgres.Models
{
    public class PaginatedList<T>
    {
        public List<T> Items { get; set; }

        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages => (int)Math.Ceiling(TotalItems / (double)PageSize);

        public PaginatedList(List<T> items, int count, int page, int pageSize,string? searchText)
        {
            Items = items;
            TotalItems = count;
            Page = page;
            PageSize = pageSize;

        }

        public static async Task<PaginatedList<T>> CreateAsync(
      IQueryable<T> source, int page, int pageSize, string? searchText)
        {
            // Đếm tổng số phần tử
            var count = await source.CountAsync();

            // Lấy dữ liệu phân trang
            var items = await source
                .Skip((page - 1) * pageSize)
                .Take(pageSize)                
                .ToListAsync();

            return new PaginatedList<T>(items, count, page, pageSize,searchText);
        }

    }
}

