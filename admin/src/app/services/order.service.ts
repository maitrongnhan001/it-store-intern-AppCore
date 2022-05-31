import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  header: HttpHeaders

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    const token = localStorage.getItem('token')
    this.header = (new HttpHeaders()).set("Authorization", `Bearer ${token}`)
  }

  getOrders(page: number = 1, limit: number = 1000): Observable<any> {
    const url = `${this.configService.url}/admin/orders?page==${page}&limit=${limit}`
    return this.httpClient.get<any>(url, {headers: this.header})
  }

  searchOrder(value: string): Observable<any> {
    const url = `${this.configService.url}/admin/orders/?search=${value}`
    return this.httpClient.get<any>(url, {headers: this.header})
  }

  getOrderDetails(id: string): Observable<any> {
    const url = `${this.configService.url}/admin/orders/${id}`
    return this.httpClient.get<any>(url, {headers: this.header})
  }
}
