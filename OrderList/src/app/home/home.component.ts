import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, HttpClientModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  searchQuery: string = '';
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];
  itemsPerPage = 4;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    document.title = 'Trang chủ';
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = (<any[]>data).filter((p) => p.stock > 0);
        this.updateFilteredProducts();
      },
      error: (error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
      },
    });
  }



  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Đã thêm vào giỏ hàng!');
  }

  updateFilteredProducts() {
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.phone.includes(this.searchQuery)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  moveToCart() {
    this.router.navigate(['cart']);
  }
}
