import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PageModel } from 'src/app/core/utils/responses/page.model';

@Injectable({
  providedIn: 'root'
})
export class AdministracionEncuestasService {

  baseUrl: string = environment.apiUrl;
  endpoint: string = environment.apiUrl+"/encuestas"

  constructor(
    private http: HttpClient
  ) { }

  postEncuesta(encuesta: any): Observable<any>{
    return this.http.post(this.endpoint, encuesta);
  }


  postAdministracionEncuestas(administracionEncuestas: any): Observable<any>{
    return this.http.post(this.endpoint, administracionEncuestas);
  }

  getPages(pageRequestParams: any): Observable<PageModel>{
    let queryParams = new HttpParams();
    for(let i in pageRequestParams){
      if(!(pageRequestParams[i] === null || pageRequestParams[i] === '')){
        queryParams = queryParams.append(i,pageRequestParams[i]);
      }
    }
    return this.http.get<PageModel>(this.endpoint+"/page",{params: queryParams});
  }

  deleteAdministracionEncuestas(administracionEncuestasId: any): Observable<any>{
    return this.http.delete(this.endpoint + "/" + administracionEncuestasId);
  }

  updateStatusAdministracionEncuestas(administracionEncuestasId, status): Observable<any>{
    return this.http.patch(this.endpoint+"/"+administracionEncuestasId+"/status/"+status,null);
  }

  getFormResources(administracionEncuestasId: number): Observable<any>{
    return this.http.get<any>(this.endpoint+"/"+administracionEncuestasId+"/formResources");
  }  

  // Product file
  patchEncuestaFile(encuestaId: number, fileId: number, formData: FormData): Observable <any>{
    return this.http.patch(this.endpoint+'/'+encuestaId+'/files/'+fileId,formData);
  }

  deleteEncuestaFile(encuestaId: number,fileId: number): Observable <any>{
    return this.http.delete(this.endpoint+'/'+encuestaId+'/files/'+fileId);
  }

  getEncuesta(encuestaId: any): Observable<any>{
    return this.http.get(this.endpoint +"/" + encuestaId);
  }

  /*  
  putAdministracionEncuestas(administracionEncuestasId: any, administracionEncuestas: any): Observable<any>{
    return this.http.put( this.endpoint + "/" + administracionEncuestasId, administracionEncuestas );
  }

  


  showAdministracionEncuestasRegistration(): Observable <any>{
    return this.http.get(this.baseUrl+'/shared/showAdministracionEncuestasRegistration');
  }



  putAdministracionEncuestas(administracionEncuestasId: any, administracionEncuestas: any): Observable<any>{
    return this.http.put(this.endpoint+"/"+administracionEncuestasId,administracionEncuestas);
  }
  
  saveAccessRequest(solicitudAccesoEmpresa : SolicitudAccesoEmpresaModel): Observable<any>{
    return this.http.patch(this.endpoint+"/"+solicitudAccesoEmpresa.administracionEncuestasId+"/access-request",solicitudAccesoEmpresa);
  }

  
  // Contacts
  postAdministracionEncuestasContact(administracionEncuestasId: number, userRequest: UserRequest): Observable<any>{
    return this.http.post(this.endpoint+"/"+administracionEncuestasId+"/contacts",userRequest);
  }
  
  patchAdministracionEncuestasContact(administracionEncuestasId: number, userRequest: UserRequest): Observable<any>{
    return this.http.patch(this.endpoint+"/"+administracionEncuestasId+"/contacts/"+userRequest.user.id,userRequest);
  }

  deleteAdministracionEncuestasContact(administracionEncuestasId: number, contactId: number): Observable<any>{
    return this.http.delete(this.endpoint+"/"+administracionEncuestasId+"/contacts/"+contactId);
  }

  updateStatusUser(administracionEncuestasId: number,contactId: number, status: boolean):Observable<any>{
    return this.http.patch(this.endpoint+'/'+administracionEncuestasId+'/contacts/'+contactId+'/status/'+status,null);
  }

  passwordRecovery(administracionEncuestasId:number,contactId:number,passwordRecoveryData: any): Observable<any> {
    return this.http.post(this.endpoint+"/"+administracionEncuestasId+"/contacts/"+contactId+"/password-recovery", passwordRecoveryData);
  }

  changePrincipalContact(administracionEncuestasId: number, principal: UsuarioModel): Observable<any>{
    return this.http.patch(this.endpoint+"/"+administracionEncuestasId+"/contacts/change-principal",principal);
  }

  // Trade image
  getAdministracionEncuestasTradeImage(administracionEncuestasId: number): Observable<any>{
    return this.http.get(this.endpoint+'/'+administracionEncuestasId+'/trade-image');
  }
  postAdministracionEncuestasTradeImage(administracionEncuestasId: number, formData: FormData): Observable<any>{
    return this.http.post(this.endpoint+'/'+administracionEncuestasId+'/trade-image', formData);
  }

  // Products
  postEnprerpriseProduct(administracionEncuestasId: number, formData: FormData): Observable <any>{
    return this.http.post(this.endpoint+'/'+administracionEncuestasId+'/products',formData);
  }

  patchEntrerpriseProduct(administracionEncuestasId: number, productId: number, formData: FormData): Observable <any>{
    return this.http.patch(this.endpoint+'/'+administracionEncuestasId+'/products/'+productId,formData);
  }

  deleteAdministracionEncuestasProduct(administracionEncuestasId: number, productId: number): Observable <any>{
    return this.http.delete(this.endpoint+'/'+administracionEncuestasId+'/products/'+productId);
  }


  // Product file
  patchAdministracionEncuestasProductFile(administracionEncuestasId: number, productId: number, fileId: number, formData: FormData): Observable <any>{
    return this.http.patch(this.endpoint+'/'+administracionEncuestasId+'/products/'+productId+'/files/'+fileId,formData);
  }

  deleteAdministracionEncuestasProductFile(administracionEncuestasId: number, productId: number, fileId: number): Observable <any>{
    return this.http.delete(this.endpoint+'/'+administracionEncuestasId+'/products/'+productId+'/files/'+fileId);
  }
  */

}
