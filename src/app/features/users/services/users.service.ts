import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { UserRequest } from 'src/app/core/utils/requests/users/user.request';
import { PageModel } from 'src/app/core/utils/responses/page.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  endpoint: string = environment.apiUrl+"/users";

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any>{
    return this.http.get(this.endpoint+'/');
  }

  getPages(pageRequestParams: PageRequestParams): Observable<PageModel>{
    let queryParams = new HttpParams();
    for(let i in pageRequestParams){
      if(!(pageRequestParams[i] === null || pageRequestParams[i] === '')){
        queryParams = queryParams.append(i,pageRequestParams[i]);
      }
    }
    return this.http.get<PageModel>(this.endpoint+"/page",{params: queryParams});
  }

  getFormResources(userId: number): Observable<any>{
    return this.http.get<any>(this.endpoint+"/"+userId+"/formResources");
  }

  findById(userId: number): Observable<any>{
    return this.http.get(this.endpoint+"/"+userId);
  }

  postUser(userRequest: UserRequest): Observable<any>{
    return this.http.post(this.endpoint+"/",userRequest);
  }

  putUser(userRequest: UserRequest): Observable<any>{
    return this.http.put(this.endpoint+"/"+userRequest.user.id,userRequest);
  }

  deleteUser(userId: string): Observable<any>{
    return this.http.delete(this.endpoint+"/"+userId);
  }

  updateStatusUser(userId: number, status: boolean):Observable<any>{
    return this.http.patch(this.endpoint+'/'+userId+'/status/'+status,null);
  }

  passwordRecovery(passwordRecoveryData: any): Observable<any> {
    return this.http.post(this.endpoint+"/password-recovery", passwordRecoveryData);
  }
  
  // SCOPES
  findAllUsersWhereProfileIsInstitution(): Observable<any> {
    return this.http.get(this.endpoint + "/findAllUsersWhereProfileIsInstitution" );
  }
  
  filterByInstitutionProfile(): Observable<any> {
    return this.http.get(this.endpoint + "/filterByInstitutionProfile" );
  }

  getInstitutionUsersByProfileArea(area:string): Observable<any>{
    let queryParams = new HttpParams();
    if(!(area === null || area === '')){
      queryParams = queryParams.append('area',area);
    }
    return this.http.get(this.endpoint+"/getAllActiveUsersByProfileArea",{params: queryParams});
  }

  pageByIdDependencia(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/pageByIdDirectorio/${id}`);
  }

  pageByPerfilUsuario(idPerfil: number): Observable<any> {
    return this.http.get(`${this.endpoint}/pageByPerfilUsuarioId/${idPerfil}`);
  }

  page(): Observable<any> {
    return this.http.get(`${this.endpoint}/page`);
  }

  pageByDirectorioEmpresarial(idEmpresa: number): Observable <any>{
    return this.http.get(`${this.endpoint}/pageByIdDirectorio/${idEmpresa}`);
  }

  pageByTipoUsuario(tipoUsuario: string): Observable<any> {
    return this.http.get(`${this.endpoint}/pageByTipoUsuario/${tipoUsuario}`);
  }


}
