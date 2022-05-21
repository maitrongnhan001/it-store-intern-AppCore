import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCreateModel } from '../models/product.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  header: HttpHeaders

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    const token = localStorage.getItem('token')
    this.header = (new HttpHeaders()).set("Authorization", `Bearer ${token}`)
  }

  getProducts(): Observable<any> {
    const url = `${this.configService.url}/admin/products?limit=100`
    return this.httpClient.get(url, {headers: this.header})
  }

  getProductDetails(id: string): Observable<any> {
    const url = `${this.configService.url}/admin/products/${id}`
    return this.httpClient.get<any>(url, {headers: this.header})
  }

  searchProduct(value: string):Observable<any> {
    const url = `${this.configService.url}/admin/products?search=${value}`
    return this.httpClient.get(url, {headers: this.header})
  }

  addProduct(data: ProductCreateModel):Observable<any> {
    const url = `${this.configService.url}/admin/products`
    return this.httpClient.post<any>(url, data, {headers: this.header})
  }

  editProduct(data: ProductCreateModel, id: string):Observable<any> {
    const url = `${this.configService.url}/admin/products/${id}`
    return this.httpClient.put<any>(url, data, {headers: this.header})
  }

  removeProduct(id: string): Observable<any> {
    const url = `${this.configService.url}/admin/products/${id}`
    return this.httpClient.delete<any>(url, {headers: this.header})
  }
}
