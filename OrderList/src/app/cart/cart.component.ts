import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  customerName: string = '';
  address: string = '';
  phoneNumber: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.productId, item.quantity);
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.updateQuantity(item.productId, item.quantity);
  }

  updateQuantity(item: any) {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    this.cartService.updateQuantity(item.productId, item.quantity);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item.productId);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  placeOrder() {
    if (!this.customerName || !this.address || !this.phoneNumber) {
      alert('Vui lòng nhập đầy đủ thông tin khách hàng!');
      return;
    }

    this.cartService.placeOrder(this.customerName, this.address, this.phoneNumber).subscribe(response => {
      if (response.success) {
        alert('Đặt hàng thành công! Mã đơn: ' + response.orderId);
        this.cartService.clearCart();
      } else {
        alert('Đặt hàng thất bại: ' + response.message);
      }
    });
  }
}
