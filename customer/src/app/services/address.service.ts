import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { addressCreateModel } from '../models/address.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private jwtHelper: JwtHelperService
  ) {}

  getAddress(): Observable<any> {
    const url = `${this.configService.url}/users/me/addresses`
    return this.httpClient.get(url, {headers: this.configService.getHeader()})
  }

  getAddressById(id: string): Observable<any> {
    const url = `${this.configService.url}/users/me/addresses/${id}`
    return this.httpClient.get(url, {headers: this.configService.getHeader()})
  }

  addAddress(address: addressCreateModel): Observable<any> {
    const url = `${this.configService.url}/users/me/addresses`
    return this.httpClient.post(url, address, {headers: this.configService.getHeader()})
  }

  editAddress(address: addressCreateModel, addressId: string): Observable<any> {
    const url = `${this.configService.url}/users/me/addresses/${addressId}`
    return this.httpClient.put(url, address, {headers: this.configService.getHeader()})
  }

  removeAddress(addressId: string): Observable<any> {
    const url = `${this.configService.url}/users/me/addresses/${addressId}`
    return this.httpClient.delete(url, {headers: this.configService.getHeader()})
  }
}
