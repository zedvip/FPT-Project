import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service'; // Đảm bảo đường dẫn đúng

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

  //phan trang
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  paginatedOrders: any[] = [];

  constructor(
    private router: Router,
    private orderService: OrderService // Inject service vào constructor
  ) {}

  ngOnInit(): void {
    this.getOrderData();
  }

  getOrderData() {
    this.loading = true;
    this.orderService.getOrders().subscribe(
      (data) => {
        this.ordersList = data.map((order, index) => ({
          ...order,
          displayId: index + 1, // Gán số thứ tự liên tục
        }));
        this.orders = [...this.ordersList];
        this.updatePagination();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.loading = false;
      }
    );
  }

  searchOrders(callUpdatePagination: boolean = true) {
    if (!this.searchText.trim()) {
      this.orders = [...this.ordersList];

      if (callUpdatePagination) this.updatePagination();
      return;
    }

    const searchId = Number(this.searchText.trim());
    if (!isNaN(searchId)) {
      // Tìm kiếm theo ID
      this.orders = this.ordersList.filter((order) => order.id === searchId);
    } else {
      // Tìm kiếm theo tên hoặc số điện thoại
      this.orders = this.ordersList.filter(
        (order) =>
          order.customerName
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          order.phoneNumber.includes(this.searchText.trim())
      );
    }

    // Sắp xếp kết quả tìm kiếm theo ID
    this.orders.sort((a, b) => a.id - b.id);

    if (callUpdatePagination) this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    this.searchOrders(false);
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

    // Tính tổng
    this.selectedOrder.total =
      this.selectedOrder.quantity * this.selectedOrder.price;

    this.orderService.updateOrder(this.selectedOrder).subscribe(
      () => {
        // Cập nhật trực tiếp trong danh sách
        const index = this.ordersList.findIndex(
          (order) => order.id === this.selectedOrder.id
        );
        if (index !== -1) {
          this.ordersList[index] = { ...this.selectedOrder }; // Cập nhật thông tin đơn hàng
          this.updatePagination(); // Cập nhật lại danh sách hiển thị
        }
        this.selectedOrder = null; // Đóng form chỉnh sửa
      },
      (error) => {
        console.error('Error updating order:', error);
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
