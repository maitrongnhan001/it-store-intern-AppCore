import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserLoginModel, UserRegisterModel, UserUpdateModel } from '../models/auth.model';
import { ConfigService } from './config.service';

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
  register(data: UserRegisterModel):Observable<any> {
    const url = `${this.configService.url}/auth/register`
    return this.httpClient.post(url, data)
  }

  login(data: UserLoginModel):Observable<any> {
    const url = `${this.configService.url}/auth/login`
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

  getOwnProfile():Observable<any> {
    const url = `${this.configService.url}/users/me/profile`
    return this.httpClient.get(url, {headers: this.configService.getHeader()})
  }
  
  editOwnProfile(data: UserUpdateModel): Observable<any> {
    const url = `${this.configService.url}/users/me/profile`
    return this.httpClient.put(url, data, {headers: this.configService.getHeader()})
  }
}