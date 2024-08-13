import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DspService {

  private url : string = environment.apiUrl + "/dsp/"
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getById(id : number){
    return this.http.get(`${this.url} ${id}`);
  } 

  create(params: any): Observable<any> {
    return this.http.post(`${this.url}`, params);
  }

  update(params: any): Observable<any> {
    return this.http.put(`${this.url}`, params);
  }

  delete(id : number): Observable<any> {
    return this.http.delete(`${this.url} ${id} `);
  }

}
