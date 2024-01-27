import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginaContenidoService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getDatosPefce(): Observable<any>{
    return this.http.get(`${this.baseUrl}/shared/homepage-data`);
  }
  getAllPefceNumbers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/shared/get-all-pefce-numbers`);
  }

  getDataMexicoInfo(uri: string): Observable<any>{
    return this.http.get(`${uri}`);
  }

  getPageContent(page: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/paginaContenido/getContent/${page}`);
  }

  getFileUrl(pathfile:string){
    return this.http.get(`${environment.apiUrl}/files/getUrl?pathfile=${pathfile}`,{responseType: 'text'});
  }

  // getEventos(): Observable<any>{
  //   return this.http.get(`${this.baseUrl}/paginaContenido/getEventos`);
  // }

  // getCapacitaciones(): Observable<any>{
  //   return this.http.get(`${this.baseUrl}/paginaContenido/getEventos`);
  // }
}
