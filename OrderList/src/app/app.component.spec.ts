import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  orderId: number;
  customerName: string;
  phoneNumber: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:5000/api/orders'; // Đổi URL nếu cần

  constructor(private http: HttpClient) {}

  // Lấy danh sách đơn hàng
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  // Xóa đơn hàng
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}`);
  }

  // Cập nhật đơn hàng
  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${order.orderId}`, order);
  }
}
