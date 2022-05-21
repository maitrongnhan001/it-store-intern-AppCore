import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  header: HttpHeaders

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    const token = localStorage.getItem('token')
    this.header = (new HttpHeaders()).set("Authorization", `Bearer ${token}`)
  }

  getCategories(): Observable<any> {
    const url = `${this.configService.url}/admin/categories?limit=100`
    return this.httpClient.get<any>(url, {headers: this.header})
  }

  getCategoryById(id: string): Observable<any> {
    const url = `${this.configService.url}/admin/categories/${id}`
    return this.httpClient.get<any>(url, {headers: this.header})
  }

  searchCategory(value: string): Observable<any> {
    const query = `?search=${value}`
    const url = `${this.configService.url}/admin/categories/${query}`
    return this.httpClient.get<any>(url, {headers: this.header})
  }

  addCategory(
    value: {
      name: string,
      description: string,
      image: string
    }
  ): Observable<any> {
    const url = `${this.configService.url}/admin/categories`
    return this.httpClient.post<any>(url, value, {headers: this.header})
  }

  editCategory(
    value: {
      name: string,
      description: string,
      image: string
    },
    id: string
  ): Observable<any> {
    const url = `${this.configService.url}/admin/categories/${id}`
    return this.httpClient.put<any>(url, value, {headers: this.header})
  }

  deleteCategory(id: string): Observable<any> {
    const url = `${this.configService.url}/admin/categories/${id}`
    return this.httpClient.delete<any>(url, {headers: this.header})
  }
}
