import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishEditModel } from '../models/wish.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  getWishes(): Observable<any> {
    const url = `${this.configService.url}/wishes`
    return this.httpClient.get(url, {headers: this.configService.getHeader()})
  }

  getWishDetails(id: string): Observable<any> {
    const url = `${this.configService.url}/wishes/${id}`
    return this.httpClient.get(url, {headers: this.configService.getHeader()})
  }

  addWish(id: String): Observable<any> {
    const url = `${this.configService.url}/wishes`

    const data = {
      productId: id,
      notificationMethod: {
        email: true,
        sms: true,
        pushNotification: true
      },
      notificationCondition: {
        minPrice: 0,
        maxPrice: 0,
        hasPromotion: true,
        hasStock: true
      }
    }

    return this.httpClient.post(url, data, {headers: this.configService.getHeader()})
  }

  editWish(wish: WishEditModel, id: string): Observable<any> {
    const url = `${this.configService.url}/wishes/${id}`

    return this.httpClient.put(url, wish, {headers: this.configService.getHeader()})
  }

  removeWish(id: string) {
    const url = `${this.configService.url}/wishes/${id}`

    return this.httpClient.delete(url, {headers: this.configService.getHeader()})
  }
}
