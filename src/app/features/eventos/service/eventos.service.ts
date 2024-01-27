import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { EventoModel } from 'src/app/core/models/eventos/eventos-model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private baseUrl = environment.apiUrl + '/eventos';
  private cpUrl = environment.apiUrl + '/codigoPostal';

  constructor(
    private http: HttpClient
  ) { }
  // EVENTO
  page(): Observable<any> {
    return this.http.get(`${this.baseUrl}/page`);
  }
  create(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/create', user);
  }
  update(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, user);
  }
  findById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }
  findByIdUsuario(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findByIdUsuario/${id}`);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }
  // FILES
  updateFile(id: number, data: any, headers: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateFile/${id}`, data, { headers: headers });
  }
  getFileUrl(pathfile: string) {
    return this.http.get(`${environment.apiUrl}/files/getUrl?pathfile=${pathfile}`, { responseType: 'text' });
  }
  // CÓDIGO POSTAL
  getCPInfo(cp: string): Observable<any> {
    return this.http.get(`${this.cpUrl}/${cp}`);
  }
  getCPbyCP(cp: string): Observable<any> {
    return this.http.get(`${this.cpUrl}/byCP/${cp}`);
  }
  // DIRECTORIO EMPRESARIAL
  getEmpresasByEstatus(estatus: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/empresasByEstatus/${estatus}`);
  }

  // EVENTO-EMPRESAS
  pageDirectoriosByIdEvento(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pageDirectoriosByIdEvento/${id}`);
  }
  
  createEventoDirectorio(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createEventoDirectorio`, data);
  }

  cancelarEvento(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cancelarevento`, data);
  }  

  estatusEventoDirectorio(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/estatusEventoDirectorio/${id}`, data);
  }
  deleteEventoDirectorio(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteEmpresaDirectorio/${id}`);
  }
  /*
  pageUsuariosByIdEvento(id: number): Observable<any> {
    //return this.http.delete(`${this.baseUrl}/pageUsuariosByIdEvento/${id}`);

  }*/

  reportesolicitudes():Observable <any>{
    return this.http.get(this.baseUrl+"/reportesolicitudes");
  }

  enviarEncuestas( evento: any ):Observable <any>{
    return this.http.post(this.baseUrl+"/enviarencuestas", evento);
  }  

  enviarCorreo( correo: any ):Observable <any>{
    return this.http.post(this.baseUrl + "/enviarcorreo", correo);
  }  

}
