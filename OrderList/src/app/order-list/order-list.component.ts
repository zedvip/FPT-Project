import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '../app.store';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  searchText: string = '';
  ordersList: any[] = [];
  orders: any[] = [];
  selectedOrder: any = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getOrderData();
  }

  getOrderData() {
    this.ordersList = Store.getOrders();
    this.orders = [...this.ordersList];
    this.updatePagination();
  }

  // Tìm kiếm danh sách
  searchOrders() {
    if (!this.searchText.trim()) {
      this.orders = [...this.ordersList];
      this.updatePagination();
      return;
    }

    if (!isNaN(Number(this.searchText.trim()))) {
      const searchId = Number(this.searchText.trim());
      this.orders = this.ordersList.filter((order) => order.id === searchId);
    } else {
      this.orders = this.ordersList.filter(
        (order) =>
          order.customerName
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          order.phoneNumber.includes(this.searchText.trim())
      );
    }
    this.updatePagination();
  }

// Phân trang
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số item mỗi trang
  totalPages: number = 1; // Tổng số trang
  paginatedOrders: any[] = []; // Danh sách đơn hàng hiển thị trên trang hiện tại
  // Phân trang
  updatePagination() {
    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    this.paginatedOrders = this.orders.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  // Xóa đơn hàng
  deleteOrder(orderId: number) {
    const updatedOrders = this.ordersList.filter((order) => order.id !== orderId);

    updatedOrders.forEach((order, index) => {
      order.id = index + 1; // Cập nhật lại ID theo thứ tự
    });

    Store.setOrders(updatedOrders);
    this.getOrderData();
  }

  // Chỉnh sửa đơn hàng
  editOrder(order: any) {
    this.selectedOrder = { ...order };
  }

  saveOrder() {
    if (
      !this.selectedOrder.customerName ||
      !this.selectedOrder.phoneNumber ||
      !this.selectedOrder.productName ||
      this.selectedOrder.quantity <= 0 ||
      this.selectedOrder.price <= 0
    ) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    this.selectedOrder.total =
      this.selectedOrder.quantity * this.selectedOrder.price;

    const updatedOrders = this.ordersList.map((order) =>
      order.id === this.selectedOrder.id ? this.selectedOrder : order
    );
    Store.setOrders(updatedOrders);

    this.getOrderData();
    this.selectedOrder = null;
  }

  cancelEdit() {
    this.selectedOrder = null;
  }

  moveToAddOrder() {
    this.router.navigate(['add-order']);
  }
}
