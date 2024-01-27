import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PromocionDigitalModel } from 'src/app/core/models/promocion-digital/promocion-digital-model';

@Injectable({
  providedIn: 'root'
})
export class PromocionDigitalService {

  private baseUrl = environment.apiUrl + '/promocionDigital';
  private enterprises = environment.apiUrl + '/enterprises';
  constructor(
    private http: HttpClient
  ) { }

  page(): Observable<any> {
    return this.http.get(`${this.baseUrl}/page`);
  }

  create(modelo: PromocionDigitalModel): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/create', modelo);
  }

  update(modelo: PromocionDigitalModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, modelo);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }

  pageDestinatarios(): Observable<any> {
    return this.http.get(`${this.enterprises}`);
  }
}
