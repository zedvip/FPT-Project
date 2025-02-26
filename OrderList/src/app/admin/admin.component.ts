import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  products: any[] = [];
  newProduct = { id: 0, name: '', price: 0, image: '', stock: 0 };
  editingProduct: any = null; // Biến để lưu sản phẩm đang chỉnh sửa

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct() {
    if (!this.newProduct.name || this.newProduct.price <= 0) {
      alert('Vui lòng nhập tên và giá hợp lệ!');
      return;
    }

    this.productService.addProduct(this.newProduct).subscribe(() => {
      alert('Thêm sản phẩm thành công!');
      this.loadProducts();
      this.newProduct = { id: 0, name: '', price: 0, image: '', stock: 0 };
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      alert('Xóa sản phẩm thành công!');
      this.loadProducts();
    }, error => {
      console.error('Lỗi khi xóa sản phẩm:', error);
      alert('Không thể xóa sản phẩm, vui lòng thử lại!');
    });
  }

  editProduct(product: any) {
    this.editingProduct = { ...product }; // Copy sản phẩm để chỉnh sửa
  }

  updateProduct() {
    this.productService.updateProduct(this.editingProduct).subscribe(() => {
      alert('Cập nhật sản phẩm thành công!');
      this.loadProducts();
      this.editingProduct = null; // Đóng form sửa
    });
  }

  cancelEdit() {
    this.editingProduct = null; // Hủy chỉnh sửa
  }

  }
