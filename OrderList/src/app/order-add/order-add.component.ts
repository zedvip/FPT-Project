import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class AddOrderComponent {

  
  @Output() orderAdded = new EventEmitter<any>();

  newOrder = {
    id: 0,
    date: new Date(),
    customerName: '',
    phoneNumber: '',
    productName: '',
    quantity: 1,
    price: 0,
    total: 0,
  };

  constructor(private router: Router) {} // Inject Router

  calculateTotal() {
    this.newOrder.total = this.newOrder.quantity * this.newOrder.price;
  }

  addOrder() {
    if (
      this.newOrder.customerName.trim() &&
      this.newOrder.phoneNumber.trim() &&
      this.newOrder.productName.trim() &&
      this.newOrder.quantity > 0 &&
      this.newOrder.price > 0
    ) {
      this.orderAdded.emit({ ...this.newOrder });

      // Lấy danh sách đơn hàng hiện tại từ localStorage
      let orders = Store.getOrders();

      // Thêm đơn hàng mới vào danh sách
      this.newOrder.id = orders.length + 1; // Cập nhật ID đơn hàng
      orders.push(this.newOrder);

      // Lưu lại danh sách đơn hàng vào localStorage
      Store.setOrders(orders);

      // Reset form sau khi thêm đơn hàng
      this.resetForm();
    } else {
      alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
    }
  }

  resetForm() {
    this.newOrder = {
      id: 0,
      date: new Date(),
      customerName: '',
      phoneNumber: '',
      productName: '',
      quantity: 1,
      price: 0,
      total: 0,
    };
  }

  moveToOrderList() {
    this.router.navigate(['order-list']);
  }
}
// Store để làm việc với localStorage
export const Store = {
  // Lấy dữ liệu đơn hàng từ localStorage
  getOrders() {
    let value = localStorage.getItem('OrderData');
    return value ? JSON.parse(value) : [];
  },

  // Lưu dữ liệu đơn hàng vào localStorage
  setOrders(data: any) {
    localStorage.setItem('OrderData', JSON.stringify(data));
  },
};
