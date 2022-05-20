import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { JwtHelperService } from '@auth0/angular-jwt'

export interface User {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient, 
    private configService: ConfigService,
    private jwtHelper: JwtHelperService
  ) {}


  //------------handle-----------//
  login(data: User):Observable<any> {
    const url = `${this.configService.url}/admin/auth/login`
    return this.httpClient.post<any>(url, data)
  }

  isLogin(): boolean {
    const token = localStorage.getItem('token')
    if (token) {
      return !this.jwtHelper.isTokenExpired(token)
    }
    return false
  }

  logout() {
    localStorage.removeItem('token')
  }
}
