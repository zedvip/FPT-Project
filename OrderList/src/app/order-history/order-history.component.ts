import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  customerId: number = 1; // Thay bằng ID của khách hàng (có thể lấy từ đăng nhập)

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory() {
    this.http
      .get<any[]>(`https://localhost:7009/api/Orders`)
      .subscribe({
        next: (data) => {
          this.orders = data;
        },
        error: (err) => {
          console.error('Lỗi khi lấy lịch sử đơn hàng:', err);
        },
      });
  }
}
