import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministracionWebService {

  private baseUrl = environment.apiUrl + '/paginaContenido';

  constructor(
    private http: HttpClient
  ) { }

  getContent(page: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/getContent/${page}`);
  }

  updateContent(page: string,params:any): Observable<any>{
    return this.http.put(`${this.baseUrl}/updateContent/${page}`,params);
  }

  getFileUrl(pathfile:string){
    return this.http.get(`${environment.apiUrl}/files/getUrl?pathfile=${pathfile}`,{responseType: 'text'});
  }

  getFile(fileName:string){
    return this.http.get(`${environment.apiUrl}/files/get-object-by-filename?fileName=${fileName}`,{responseType: 'blob' as 'json'});
  }

  uploadFile(data:any, headers:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/files/uploadObject`,data,{responseType:'text',headers:headers});
  }

  uploadFileOriginalName(data:any, headers:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/files/uploadObjectWithOriginalName`,data,{responseType:'text',headers:headers});
  }

  updateFile(data:any, headers:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/files/updateObject`,data,{responseType:'text',headers:headers});
  }

  deleteFile(data:any){
    return this.http.post(`${environment.apiUrl}/files/deleteObject?pathfile=${data}`,{responseType:'text'});
  }

  getManyFilesUrl(jsonData:string): Observable<any>{
    return this.http.post(`${environment.apiUrl}/files/getManyUrl`,{jsonData},{headers:{"Accept":"application/json"}});
  }
}
