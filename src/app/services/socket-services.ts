import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateShortRequest, ShortUrlInfo } from '../interfaces/ishortURL';

// const API_BASE = 'https://tiny-url-47.azurewebsites.net/api';
const API_BASE = 'https://localhost:7072/api';

@Injectable({
  providedIn: 'root',
})
export class SocketServices {
  
  private http = inject(HttpClient);

  // GET all URLs
  getAll(): Observable<ShortUrlInfo[]> {
    return this.http.get<ShortUrlInfo[]>(`${API_BASE}/shorturls`);
  }

  // POST create new short URL
  create(payload: any): Observable<any> {
    return this.http.post(`${API_BASE}/shorturls`, payload);
  }

  // DELETE or DISABLE (depends on your API)
  delete(code: string): Observable<any> {
    return this.http.delete(`${API_BASE}/shorturls/${code}`, {});
  }
}
