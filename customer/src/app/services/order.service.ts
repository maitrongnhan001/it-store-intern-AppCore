import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderCreateModel } from '../models/order.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  addOrder(order: OrderCreateModel): Observable<any> {
    const url = `${this.configService.url}/orders`
    console.log(order)
    return this.httpClient.post(url, order, {headers: this.configService.getHeader()})
  }

  getOrders(): Observable<any> {
    const url = `${this.configService.url}/orders?limit=100`
    return this.httpClient.get<any>(url, {headers: this.configService.getHeader()})
  }

  getOrderDetails(id: string): Observable<any> {
    const url = `${this.configService.url}/orders/${id}`
    return this.httpClient.get<any>(url, {headers: this.configService.getHeader()})
  }
}
