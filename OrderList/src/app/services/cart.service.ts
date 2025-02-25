import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://localhost:7009/api/orders'; // Thay đổi thành URL API thực tế của bạn
  private cartItems = new BehaviorSubject<any[]>([]); // Theo dõi giỏ hàng
  cartItems$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart(); // Tải giỏ hàng từ API khi service khởi tạo
  }

  // Tải giỏ hàng từ API
  loadCart() {
    this.http.get<any[]>(`${this.apiUrl}`).subscribe((orders) => {
      this.cartItems.next(orders);
    });
  }

  // Thêm sản phẩm vào giỏ hàng (Gửi request lên API)
  addToCart(product: any) {
    let order = { items: [{ ...product, quantity: 1 }] };
    this.http.post(`${this.apiUrl}`, order).subscribe(() => {
      this.loadCart();
    });
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: number) {
    this.http.delete(`${this.apiUrl}/${productId}`).subscribe(() => {
      this.loadCart();
    });
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCart(productId: number, quantity: number) {
    const updateData = { productId, quantity };
    this.http.put(`${this.apiUrl}/update`, updateData).subscribe(() => {
      this.loadCart();
    });
  }

  clearCart() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?")) {
      this.http.delete('https://localhost:7009/api/orders/deleteAll').subscribe({
        next: () => {
          console.log("Xóa thành công");
          this.loadCart();
        },
        error: (err) => console.error("Lỗi khi xóa:", err),
      });
    }
  }

  // Gửi đơn hàng lên API
  saveOrder(order: any) {
    return this.http.post(`${this.apiUrl}`, order);
  }
}
