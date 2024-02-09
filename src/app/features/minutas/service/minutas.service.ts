import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MinutaModel } from 'src/app/core/models/minutas/minuta-model';
import { TasksModel } from 'src/app/core/models/tareas/tasks-model';

@Injectable({
  providedIn: 'root'
})
export class MinutasService {

  private baseUrl = environment.apiUrl + '/minutas';
  private baseurl2 = environment.apiUrl + '/reporte';

  constructor(
    private http: HttpClient
  ) { }

  page(): Observable<any> {
    return this.http.get(`${this.baseUrl}/page`);
  }

  create(user: MinutaModel): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/create', user);
  }

  update(user: MinutaModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, user);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }

  // Tareas
  // Colaboradores
  getColaboradoresByMinuta(id: number): Observable <any>{
    return this.http.get(this.baseUrl+'/'+id+'/colaboradores');
  }

  getTareasByMinuta(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/'+id+'/tareas');
  }

  createTareaByMinuta(id:number, model: TasksModel, idUsuario: number): Observable <any>{
    return this.http.post(this.baseUrl+'/'+id+'/tareas/'+idUsuario,model);
  }

  updateTareaByMinuta(id:number, model: TasksModel, idUsuario: number): Observable <any>{
    return this.http.put(this.baseUrl+'/'+id+'/tareas/'+idUsuario,model);
  }

  getminutaPdf(id: any,):Observable<any>{
    let direccion = this.baseurl2 + '/minuta/' + id;
    return this.http.get(direccion,{
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/pdf"),
    })
  }

  listaminutas(ids: number[]): Observable<any> {
    const direccion = `${this.baseurl2}/minutas`;
    return this.http.post(direccion, { ids }, { // Aquí agregamos 'ids' al cuerpo de la solicitud
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json'), // Cambiamos el tipo de contenido a 'application/json'
    });
}


}
