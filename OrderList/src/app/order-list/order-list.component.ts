import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

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
  loading: boolean = false;

  // Phân trang
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 1;
  paginatedOrders: any[] = [];

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrderData();

    document.title = 'Trang quan tri';
  }

  getOrderData() {
    this.loading = true;

    this.orderService
      .getOrders(this.currentPage, this.itemsPerPage, this.searchText)
      .subscribe(
        (data) => {
          console.log('API Data:', data); // Kiểm tra dữ liệu trả về từ API

          this.ordersList = data.items || [];
          this.totalItems = data.totalItems || 0;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

          this.paginatedOrders = this.ordersList.slice();
          this.loading = false;

          console.log('Paginated Orders:', this.paginatedOrders); // Kiểm tra dữ liệu phân trang
        },

        (error) => {
          console.error('Error fetching orders:', error);
          this.loading = false;
        }
      );
  }

  searchOrders() {
    this.currentPage = 1;

    this.getOrderData();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getOrderData();
    }
  }

  deleteOrder(orderId: number) {
    if (confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          this.getOrderData();
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }

  editOrder(order: any) {
    if (!order) {
      console.error('Lỗi: Đơn hàng không tồn tại.');
      return;
    }
    console.log('Đang chỉnh sửa đơn hàng:', order);
    this.selectedOrder = { ...order };
  }

  saveOrder() {
    if (!this.selectedOrder || !this.selectedOrder.id) {
      console.error(
        'Lỗi: Không có đơn hàng hợp lệ để cập nhật.',
        this.selectedOrder
      );
      return;
    }

    this.orderService.updateOrder(this.selectedOrder).subscribe(
      (updatedOrder) => {
        console.log('Đơn hàng sau khi cập nhật:', updatedOrder);

        let index = this.ordersList.findIndex((o) => o.id === updatedOrder.id);
        if (index !== -1) {
          this.ordersList[index] = { ...updatedOrder }; // Cập nhật danh sách hiển thị
        } else {
          console.warn(
            'Không tìm thấy đơn hàng trong danh sách, có thể đã bị cập nhật từ API.'
          );
        }

        this.paginatedOrders = this.ordersList.slice();
        this.selectedOrder = null; // Đóng form chỉnh sửa
      },
      (error) => {
        console.error('Lỗi khi cập nhật đơn hàng:', error);
      }
    );
  }

  cancelEdit() {
    this.selectedOrder = null;
  }

  moveToAddOrder() {
    this.router.navigate(['add-order']);
  }
}
