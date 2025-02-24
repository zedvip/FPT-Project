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

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCart();
  }

  decreaseQuantity(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCart(); // Cập nhật lại giỏ hàng
  }
  increaseQuantity(product: any) {
    this.cartService.addToCart(product);
    this.cartItems = this.cartService.getCart();
  }
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
