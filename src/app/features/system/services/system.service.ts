import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private baseUrl = environment.apiUrl + '/system';

  constructor(
    private http: HttpClient
  ) { }

  page(): Observable<any> {
    return this.http.get(`${this.baseUrl}/page`);
  }
}
