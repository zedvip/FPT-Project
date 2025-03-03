import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  searchQuery: string = '';
  paginatedProducts: any[] = [];

  // Phân trang
  itemsPerPage = 4;
  currentPage = 1;
  totalItems = 0;
  totalPages = 1;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    document.title = 'Trang chủ';
    this.getProducts();
  }

  getProducts() {
    this.productService.getPagedProducts(this.searchQuery, this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        console.log('Dữ liệu API trả về:', data);

        this.products = data.products || [];
        this.totalItems = data.totalItems || 0;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

        this.paginatedProducts = this.products.slice();

        console.log('Sản phẩm hiển thị:', this.paginatedProducts);
      },
      error: (error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
      },
    });
  }


  searchProducts() {
    this.currentPage = 1;
    this.getProducts();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getProducts();
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
    console.log('Thêm vào giỏ hàng:', product);
  }

  moveToCart() {
    this.router.navigate(['cart']);
  }
}
