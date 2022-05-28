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

  getProductDetails(id: string): Observable<any> {
    const url = `${this.configService.url}/products/${id}`
    return this.httpClient.get(url)
  }
}
