import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  standalone:true,
  imports:[CommonModule,FormsModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchText: string = '';
  showNoResultsMessage: boolean = false;
  cartItemCount: number = 0;
  isUserLoggedIn: boolean = false;

  productList: any[] = [
    { OrderID: 1, ProductName: 'Iphone13', Price: "100$" },
    { OrderID: 2, ProductName: 'Iphone14', Price: "200$" },
    { OrderID: 3, ProductName: 'Iphone15', Price: "300$" },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();

    // Đăng ký sự kiện điều hướng để cập nhật trạng thái đăng nhập
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

  checkLoginStatus() {
    this.isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isUserLoggedIn = false;
    this.router.navigate(['/']);
  }

  get filteredProducts() {
    if (!this.searchText) {
      this.showNoResultsMessage = false;
      return [];
    }
    const filtered = this.productList.filter((product) =>
      product.ProductName.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.showNoResultsMessage = filtered.length === 0;
    return filtered;
  }

  onSearch() {
    console.log('Đang tìm kiếm:', this.searchText);
  }

  addToCart(product: any) {
    this.cartItemCount++;
    console.log('Đã thêm vào giỏ hàng:', product.ProductName);
  }
}
