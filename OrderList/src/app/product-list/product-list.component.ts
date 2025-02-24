import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  imports: [CommonModule,FormsModule],
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  searchText: string = '';
  loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        this.loading = false;
      }
    );
  }

  searchProducts() {
    if (this.searchText.trim() === '') {
      this.getProducts();
    } else {
      this.products = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  editProduct(product: any) {
    console.log('Edit product:', product);
  }

  deleteProduct(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id);
      });
    }
  }
}
