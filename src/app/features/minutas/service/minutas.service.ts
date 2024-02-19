import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  private baseurl3 = environment.apiUrl + '/minuta-archivo';

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
    return this.http.post(direccion, ids, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }


  listaminutaszip(ids: number[]): Observable<any> {
    const direccion = `${this.baseurl2}/minutas/zip`;
    return this.http.post(direccion, ids, {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
}


getarchivosByMinuta(id: number): Observable<any>{
  return this.http.get(this.baseurl3+'/byMinuta/'+ id);
}

getPdfUrl(nombre: string): Observable<any> {
  const url = `${this.baseurl3}/${nombre}`;
    return this.http.get(url, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
  });
}

// crearMinutaArchivo(file: any, idMinuta: number, idUsuario: number): Observable<any> {
//   const formData: FormData = new FormData();
//   formData.append('file', file);
//   formData.append('idminuta', idMinuta.toString());
//   formData.append('idusuario', idUsuario.toString());

//   const headers = new HttpHeaders();

//   return this.http.post(`${this.baseurl3}`, formData, { headers: headers });
// }

crearMinutaArchivo(file: any, idMinuta: number, idUsuario: number): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('idminuta', idMinuta.toString());
  formData.append('idusuario', idUsuario.toString());

  return this.http.post(`${this.baseurl3}`, formData);
}


crearMinutaArchivo2(form:any): Observable<any>{
  let direccion = `${this.baseurl3}`;
  return this.http.post<any>(direccion, form);
}



}
