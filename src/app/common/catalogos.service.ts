import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private baseUrl = environment.apiUrl + '/catalogos';

  constructor(
    private http: HttpClient
  ) { }

  getCatalogos(tipo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tipo}`);
  }

  getCatalogosId(tipo: string, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tipo}/${id}`);
  }

  getAllCatalogos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/page`);
  }

  getAllByTipoCatalogo(tipoCatalogo: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/findByTipoCatalogo/${tipoCatalogo}`);
  }
}
