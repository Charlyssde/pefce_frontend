import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PreguntaModel } from 'src/app/core/models/capacitaciones/pregunta-model';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private baseUrl = environment.apiUrl + '/preguntas';

  constructor(
    private http: HttpClient
  ) { }

  create(data: PreguntaModel): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/create', data);
  }

  createUsuarioPregunta(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/createUsuarioPreguntas', data);
  }

  page(idTema: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findByTemaId/${idTema}`);
  }

  findById(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }

  findByPreguntaIdAndUsuarioId(idPregunta: number, idUsuario: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/findByPreguntaIdAndUsuarioId/${idPregunta}/${idUsuario}`);
  }

  update(data: PreguntaModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }
}
