import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { TemaModel } from 'src/app/core/models/capacitaciones/tema-model';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  private baseUrl = environment.apiUrl + '/temas';

  constructor(
    private http: HttpClient
  ) { }

  create(data: TemaModel): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/create', data);
  }

  page(idModulo: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findByModuloId/${idModulo}`);
  }

  findById(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }

  update(data: TemaModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }
}
