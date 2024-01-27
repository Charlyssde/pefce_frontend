import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthAuthenticatedService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  isExpired(): boolean {
    const token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }

  createToken(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/auth/token/${id}`);
  }
}
