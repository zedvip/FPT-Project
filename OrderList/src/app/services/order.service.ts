import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Đảm bảo service được cung cấp ở root
})
export class OrderService {
  private apiUrl = 'https://localhost:7009/api/Orders'; // Đường dẫn API của bạn

  constructor(private http: HttpClient) {}

  // Lấy danh sách đơn hàng
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Thêm đơn hàng mới
  addOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  // Cập nhật đơn hàng
  updateOrder(order: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${order.id}`, order);
  }

  // Xóa đơn hàng
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${orderId}`);
  }


}
