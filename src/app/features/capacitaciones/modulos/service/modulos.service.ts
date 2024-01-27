import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ModuloModel } from 'src/app/core/models/capacitaciones/modulo-model';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  private baseUrl = environment.apiUrl + '/modulos';
  
  constructor(
    private http: HttpClient
  ) { }

  create(data: ModuloModel): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/create', data);
  }

  page(idCapacitacion: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findByCapacitacionId/${idCapacitacion}`);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }

  update(data: ModuloModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }
}
