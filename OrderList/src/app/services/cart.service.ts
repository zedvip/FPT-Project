import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'shopping_cart';
  private cartItemsSubject = new BehaviorSubject<any[]>(this.getCartItems());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Lấy giỏ hàng từ localStorage
  getCartItems() {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Lưu giỏ hàng vào localStorage
  saveCartItems(items: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    let cart = this.getCartItems();
    const existingItem = cart.find(
      (item: any) => item.productId === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ productId: product.id, product, quantity: 1 });
    }

    this.saveCartItems(cart);
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateQuantity(productId: number, quantity: number) {
    let cart = this.getCartItems();
    cart = cart.map((item: any) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    this.saveCartItems(cart);
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: number) {
    let cart = this.getCartItems().filter(
      (item: any) => item.productId !== productId
    );
    this.saveCartItems(cart);
  }

  // Xóa toàn bộ giỏ hàng
  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.cartItemsSubject.next([]);
  }

  // Tính tổng tiền của giỏ hàng
  getTotalPrice(): number {
    return this.getCartItems().reduce(
      (total: number, item: any) => total + item.product.price * item.quantity,
      0
    );
  }

  // Đặt hàng
  placeOrder(
    customerName: string,
    address: string,
    phoneNumber: string
  ): Observable<any> {
    const cartItems = this.getCartItems();
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      return of({ success: false });
    }

    const orderData = {
      customerName,
      address,
      phoneNumber,
      items: cartItems.map(
        (item: {
          productId: number;
          quantity: number;
          product: { price: number };
        }) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })
      ),
      totalPrice: this.getTotalPrice(),
      date: new Date().toISOString(),
    };

    return this.http.post('https://localhost:7009/api/Orders', orderData).pipe(
      tap((response: any) => {
        if (response && response.message) {
          alert(response.message);
          this.clearCart();
        } else {
          alert('Có lỗi xảy ra khi đặt hàng!');
        }
      })
    );
  }
}
