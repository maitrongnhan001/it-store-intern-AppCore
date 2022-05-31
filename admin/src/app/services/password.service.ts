import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  header: HttpHeaders

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    const token = localStorage.getItem('token')
    this.header = (new HttpHeaders()).set("Authorization", `Bearer ${token}`)
  }

  getResetPasswordToken(): Observable<any> {
    const url = `${this.configService.url}/admin/auth/forgot-password`
    return this.httpClient.post(url, {email: 'administrator@mailinator.com'}, {headers: this.header})
  }

  resetPassword(newPassword: string, resetPasswordToken: string): Observable<any> {
    const url = `${this.configService.url}/admin/auth/reset-password`
    return this.httpClient.post(
      url, 
      {
        newPassword: newPassword,
        token: resetPasswordToken
      },
      {headers: this.header}
    )
  }
}
