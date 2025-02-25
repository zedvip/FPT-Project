// TypeScript Code
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

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
    OrderDate: new Date().toISOString(),
    customerName: '',
    phoneNumber: '',
    productName: '',
    quantity: 1,
    price: 0,
    total: 0,
  };

  selectedOrder: any = null;
  searchText = '';
  paginatedOrders: any[] = [];
  orders: any[] = []; // To hold all orders
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 5;

  constructor(private router: Router, private orderAddService: OrderService) {}

  calculateTotal() {
    this.newOrder.total = this.newOrder.quantity * this.newOrder.price;
  }

  addOrder() {
    this.newOrder.OrderDate = new Date().toISOString();
    if (
      this.newOrder.customerName.trim() &&
      this.newOrder.phoneNumber.trim() &&
      this.newOrder.productName.trim() &&
      this.newOrder.quantity > 0 &&
      this.newOrder.price > 0
    ) {
      this.orderAddService.addOrder(this.newOrder).subscribe(
        (response) => {
          alert('Đơn hàng đã được thêm thành công!');
          this.orders.push(response);
          this.updatePagination();
          this.resetForm();
        },
        (error) => {
          alert('Có lỗi xảy ra khi thêm đơn hàng vào backend!');
          this.addOrderToLocalStorage();
        }
      );
    } else {
      alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
    }
  }

  resetForm() {
    this.newOrder = {
      id: 0,
      OrderDate: new Date().toISOString(),
      customerName: '',
      phoneNumber: '',
      productName: '',
      quantity: 1,
      price: 0,
      total: 0,
    };
  }

  addOrderToLocalStorage() {
    let orders = Store.getOrders();
    this.newOrder.id = orders.length + 1;
    orders.push(this.newOrder);
    Store.setOrders(orders);
    alert('Đơn hàng đã được lưu vào localStorage!');
  }

  moveToOrderList() {
    this.router.navigate(['admin']);
  }

  editOrder(order: any) {
    this.selectedOrder = { ...order };
  }

  saveOrder() {
    if (this.selectedOrder) {
      this.selectedOrder.date = new Date().toISOString();
      const index = this.orders.findIndex(o => o.id === this.selectedOrder.id);
      if (index !== -1) {
        this.orders[index] = { ...this.selectedOrder };
        this.updatePagination();
        this.selectedOrder = null;
        alert('Đơn hàng đã được cập nhật!');
      }
    }
  }

  cancelEdit() {
    this.selectedOrder = null;
  }

  searchOrders() {
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const filteredOrders = this.orders.filter(order =>
      order.customerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      order.phoneNumber.includes(this.searchText)
    );
    this.totalPages = Math.ceil(filteredOrders.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedOrders = filteredOrders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}

export const Store = {
  getOrders() {
    const value = localStorage.getItem('OrderData');
    return value ? JSON.parse(value) : [];
  },
  setOrders(data: any) {
    localStorage.setItem('OrderData', JSON.stringify(data));
  },
};
