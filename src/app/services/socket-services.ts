import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateShortRequest, ShortUrlInfo } from '../interfaces/ishortURL';

const API_BASE = 'https://tiny-url-47.azurewebsites.net/api';


@Injectable({
  providedIn: 'root',
})
export class SocketServices {
  
  private http = inject(HttpClient);

  // GET all URLs
  getAll(): Observable<ShortUrlInfo[]> {
    return this.http.get<ShortUrlInfo[]>(`${API_BASE}/urls`);
  }

  // GET one URL by code
  getByCode(code: string): Observable<ShortUrlInfo> {
    return this.http.get<ShortUrlInfo>(`${API_BASE}/urls/${code}`);
  }

  // POST create new short URL
  create(payload: CreateShortRequest): Observable<any> {
    return this.http.post(`${API_BASE}/shorten`, payload);
  }

  // DELETE or DISABLE (depends on your API)
  disable(code: string): Observable<any> {
    return this.http.put(`${API_BASE}/urls/${code}/disable`, {});
  }
}
