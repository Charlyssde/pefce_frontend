import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionesService {

  private baseUrl = environment.apiUrl + '/capacitaciones';

  constructor(
    private http: HttpClient
  ) { }

  page(): Observable<any> {
    return this.http.get(`${this.baseUrl}/page`);
  }

  pageContactosByIdCapacitacion(idCapacitacion: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pageContactosByIdCapacitacion/${idCapacitacion}`);
  }

  pageUsuariosByIdCapacitacion(idCapacitacion: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pageUsuariosByIdCapacitacion/${idCapacitacion}`);
  }

  create(data: CapacitacionModel): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/create', data);
  }

  createCapacitacionContacto(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/createCapacitacionContacto', data);
  }

  createUsuarioCapacitacion(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/createUsuarioCapacitacion', data);
  }

  cancelUsuarioCapacitacion(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/cancelUsuarioCapacitacion', data);
  }


  update(data: CapacitacionModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }
  getCapacitacionesByIdUsuario(idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findCapacitacionesByIdUsuario/${idUsuario}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }

  findCapacitacionesRegistradas(idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findCapacitacionesRegistradas/${idUsuario}`);
  }

  findCapacitacionesNoRegistradas(idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findCapacitacionesNoRegistradas/${idUsuario}`);
  }

  validarCapacitacionTerminada(idCapacitacion: number, idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/validarCapacitacionCompleta/${idCapacitacion}/${idUsuario}`);
  }

  actualizaConstancia(idContacto: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/actualizaConstancia/${idContacto}`);
  }

  reportesolicitudes():Observable <any>{
    return this.http.get(this.baseUrl + "/reportesolicitudes");
  }  

}
