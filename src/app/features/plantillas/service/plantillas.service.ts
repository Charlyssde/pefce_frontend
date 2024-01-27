import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PlantillaModel } from 'src/app/core/models/plantilla/plantilla-model';

@Injectable({
  providedIn: 'root'
})
export class PlantillasService {
  private baseUrl = environment.apiUrl + '/plantillas';

  constructor(
    private http: HttpClient
  ) { }

  create(data: PlantillaModel): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/create', data);
  }

  page(): Observable<any> {
    return this.http.get(`${this.baseUrl}/page`);
  }

  pageById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }

  pageByUsuarioId(id_usuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/page/usuario/${id_usuario}`);
  }

  update(data: PlantillaModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
