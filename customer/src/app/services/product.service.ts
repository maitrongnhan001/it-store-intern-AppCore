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

  getProduct():Observable<any> {
    const url = `${this.configService.url}/products`
    return this.httpClient.get(url)
  }

  getProductByCategoryId(id: string): Observable<any> {
    const url = `${this.configService.url}/products?where[category][$in][]=${id}`
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
