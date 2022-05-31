import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  getProduct(page: number = 1, limit: number = 1000):Observable<any> {
    const url = `${this.configService.url}/products?page=${page}&limit=${limit}`
    return this.httpClient.get(url)
  }

  getProductByCategoryId(id: string, page: number = 1, limit: number = 1000): Observable<any> {
    const url = `${this.configService.url}/products?where[category][$in][]=${id}&page=${page}&limit=${limit}`
    return this.httpClient.get(url)
  }

  getProductByContentSearch(content: string): Observable<any> {
    const url = `${this.configService.url}/products?search=${content}`
    return this.httpClient.get(url)
  }

  getProductDetails(id: string): Observable<any> {
    const url = `${this.configService.url}/products/${id}`
    return this.httpClient.get(url)
  }
}
