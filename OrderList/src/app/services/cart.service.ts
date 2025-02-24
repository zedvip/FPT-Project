import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartKey = 'cart_items';

  constructor() {}

  // Lấy giỏ hàng từ localStorage
  getCart(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

//  addcart
 addToCart(product: any) {
  let cart = this.getCart() ?? [];
  const index = cart.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 };
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(this.cartKey, JSON.stringify(cart));
}

// removeCart
removeFromCart(productId: number) {
  let cart = this.getCart();

  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1; // Giảm số lượng đi 1
    } else {
      cart.splice(index, 1); // Nếu số lượng là 1, xóa sản phẩm khỏi giỏ hàng
    }
  }

  localStorage.setItem(this.cartKey, JSON.stringify(cart));
}


  // Xóa toàn bộ giỏ hàng
  clearCart() {
    localStorage.removeItem(this.cartKey);
  }
}
