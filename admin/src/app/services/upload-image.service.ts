import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  header: HttpHeaders

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    const token = localStorage.getItem('token')
    this.header = (new HttpHeaders()).set("Authorization", `Bearer ${token}`)
  }

  uploadImage(image: Blob): Observable<any> {
    const data = new FormData();
    data.append('image', image)
    const url = `${this.configService.url}/upload/cloudinary`
    return this.httpClient.post(url, data, {headers: this.header})
  }
}
