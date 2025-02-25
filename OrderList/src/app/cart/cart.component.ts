import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];

  // Thêm các biến để binding với form
  customerName: string = '';
  customerAddress: string = '';
  customerPhone: string = '';

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(product: any) {
    this.cartService.updateCart(product.id, product.quantity + 1);
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      this.cartService.updateCart(product.id, product.quantity - 1);
    } else {
      this.removeItem(product.id);
    }
  }

  removeItem(productId: number) {
    this.cartService.updateCart(productId, 0);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  placeOrder() {
    if (!this.customerName || !this.customerAddress || !this.customerPhone) {
      alert('Vui lòng nhập đầy đủ thông tin khách hàng!');
      return;
    }

    const order = {
      customerName: this.customerName,
      customerAddress: this.customerAddress,
      customerPhone: this.customerPhone,
      items: this.cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    this.cartService.saveOrder(order).subscribe(response => {
      alert('Đặt hàng thành công!');
      this.cartService.clearCart(); // Xóa giỏ hàng sau khi đặt hàng
    });
  }
}
