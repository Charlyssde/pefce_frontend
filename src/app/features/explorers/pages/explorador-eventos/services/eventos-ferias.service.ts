import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosFeriasService {

  private baseUrl = environment.apiUrl + '/eventos-ferias';

  constructor(
    private http: HttpClient
  ) { }

  getRecepcionContent(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getPabellonesContent(idEvento: number):Observable <any>{
    return this.http.get(`${this.baseUrl}/${idEvento}/pabellones`);
  }

  getPabellones(): Observable <any>{
    return this.http.get(`${environment.apiUrl}/pabellones/pageActive`);
  }

  getFileUrl(pathfile:string){
    return this.http.get(`${environment.apiUrl}/files/getUrl?pathfile=${pathfile}`,{responseType: 'text'});
  }
}
