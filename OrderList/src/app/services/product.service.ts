import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7009/api/products'; // Đổi theo API thực tế

  constructor() {}

  getPagedProducts(
    searchText: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/paged?searchText=${encodeURIComponent(
        searchText
      )}&page=${page}&pageSize=${pageSize}`
    );
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    console.log('Đang xóa sản phẩm với ID:', id);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
