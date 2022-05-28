import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  //-------------handle-----------------//
  getCategory(): Observable<any> {
    const url = `${this.configService.url}/categories`
    return this.httpClient.get(url)
  }

  getCategoryDetails(id: string): Observable<any> {
    const url = `${this.configService.url}/categories/${id}`
    return this.httpClient.get(url)
  }
}
