import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    document.title = 'Trang chu';
    this.updateFilteredProducts(); // Cập nhật danh sách sản phẩm ban đầu
  }

  products = [
    { id: 1, name: 'iPhone 30', price: '5.000$', image: 'https://th.bing.com/th/id/OIP.JYriuVLeEpcTNpGjWFTFBwHaHa?rs=1&pid=ImgDetMain', stock: 10, phone: '0901234567' },
    { id: 2, name: 'iPhone 31', price: '6.000$', image: 'https://didongviet.vn/dchannel/wp-content/uploads/2023/09/5-hinh-anh-iphone-15-pro-max-didongviet.jpg', stock: 5, phone: '0912345678' },
    { id: 3, name: 'iPhone 32', price: '7.000$', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfyCsxfM8pozmTRhruYw4G0a6wxPYlFb1rRw&s', stock: 1, phone: '0923456789' },
    { id: 4, name: 'iPhone 33', price: '8.000$', image: 'https://ibuyonline.vn/wp-content/uploads/2022/04/thay-man-hinh-iphone-12-mini-1.jpg', stock: 3, phone: '0934567890' },
    { id: 5, name: 'iPhone 34', price: '9.000$', image: 'https://th.bing.com/th/id/OIP.JYriuVLeEpcTNpGjWFTFBwHaHa?rs=1&pid=ImgDetMain', stock: 8, phone: '0945678901' },
    { id: 6, name: 'iPhone 35', price: '10.000$', image: 'https://th.bing.com/th/id/OIP.JYriuVLeEpcTNpGjWFTFBwHaHa?rs=1&pid=ImgDetMain', stock: 12, phone: '0956789012' }
  ];


  searchQuery: string = '';
  filteredProducts: { name: string; price: string; image: string; stock: number; phone: string }[] = [];
  paginatedProducts: { name: string; price: string; image: string; stock: number; phone: string }[] = [];
  itemsPerPage = 4;
  currentPage = 1;
  totalPages = 1;

  constructor(private router: Router, private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Đã thêm vào giỏ hàng!');
  }


  // Lọc sản phẩm theo tên hoặc số điện thoại
  updateFilteredProducts() {
    this.filteredProducts = this.products
      .filter(product => product.stock > 0) // Chỉ lấy sản phẩm còn hàng
      .filter(product =>
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
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  moveToCart() {
    this.router.navigate(['cart']);
  }

}
