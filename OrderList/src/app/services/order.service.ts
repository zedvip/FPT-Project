import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class OrderService {
  private apiUrl = 'https://localhost:7009/api/Orders';

  constructor(private http: HttpClient) {}


  getOrders(page: number, pageSize: number, searchText: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
        .set('searchText', searchText),
    });
  }


searchOrders(query: string, page: number, pageSize: number) {
  const params = new HttpParams()
    .set('query', query)
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());

  return this.http.get<any>(`https://localhost:7009/api/Orders`, { params });
}



  addOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${order.id}`, order);
  }


  updateOrder(order: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${order.id}`, order);
  }


  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${orderId}`);
  }
}
