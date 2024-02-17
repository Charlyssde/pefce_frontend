import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PageModel } from 'src/app/core/utils/responses/page.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl: string = environment.apiUrl;
  endpoint: string = environment.apiUrl+"/tasks"

  constructor(
    private http: HttpClient
  ) { }

  postTask(task: any): Observable<any>{
    return this.http.post(this.endpoint, task);
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

  deleteTask(taskId: any): Observable<any>{
    return this.http.delete(this.endpoint + "/" + taskId);
  }

  updateStatusTask(taskId, status): Observable<any>{
    return this.http.patch(this.endpoint+"/"+taskId+"/status/"+status,null);
  }

  putTask(taskId: any, task: any): Observable<any>{
    return this.http.put( this.endpoint + "/" + taskId, task );
  }


  gettaskByminuta(minId: number): Observable<any>{
    return this.http.get(this.endpoint + "/minuta/" + minId);
  }

  /*
  findById(taskId: number): Observable<any>{
    return this.http.get(this.endpoint+"/"+taskId);
  }

  showTaskRegistration(): Observable <any>{
    return this.http.get(this.baseUrl+'/shared/showTaskRegistration');
  }

  getFormResources(taskId: number): Observable<any>{
    return this.http.get<any>(this.endpoint+"/"+taskId+"/formResources");
  }

  putTask(taskId: any, task: any): Observable<any>{
    return this.http.put(this.endpoint+"/"+taskId,task);
  }

  saveAccessRequest(solicitudAccesoEmpresa : SolicitudAccesoEmpresaModel): Observable<any>{
    return this.http.patch(this.endpoint+"/"+solicitudAccesoEmpresa.taskId+"/access-request",solicitudAccesoEmpresa);
  }


  // Contacts
  postTaskContact(taskId: number, userRequest: UserRequest): Observable<any>{
    return this.http.post(this.endpoint+"/"+taskId+"/contacts",userRequest);
  }

  patchTaskContact(taskId: number, userRequest: UserRequest): Observable<any>{
    return this.http.patch(this.endpoint+"/"+taskId+"/contacts/"+userRequest.user.id,userRequest);
  }

  deleteTaskContact(taskId: number, contactId: number): Observable<any>{
    return this.http.delete(this.endpoint+"/"+taskId+"/contacts/"+contactId);
  }

  updateStatusUser(taskId: number,contactId: number, status: boolean):Observable<any>{
    return this.http.patch(this.endpoint+'/'+taskId+'/contacts/'+contactId+'/status/'+status,null);
  }

  passwordRecovery(taskId:number,contactId:number,passwordRecoveryData: any): Observable<any> {
    return this.http.post(this.endpoint+"/"+taskId+"/contacts/"+contactId+"/password-recovery", passwordRecoveryData);
  }

  changePrincipalContact(taskId: number, principal: UsuarioModel): Observable<any>{
    return this.http.patch(this.endpoint+"/"+taskId+"/contacts/change-principal",principal);
  }

  // Trade image
  getTaskTradeImage(taskId: number): Observable<any>{
    return this.http.get(this.endpoint+'/'+taskId+'/trade-image');
  }
  postTaskTradeImage(taskId: number, formData: FormData): Observable<any>{
    return this.http.post(this.endpoint+'/'+taskId+'/trade-image', formData);
  }

  // Products
  postEnprerpriseProduct(taskId: number, formData: FormData): Observable <any>{
    return this.http.post(this.endpoint+'/'+taskId+'/products',formData);
  }

  patchEntrerpriseProduct(taskId: number, productId: number, formData: FormData): Observable <any>{
    return this.http.patch(this.endpoint+'/'+taskId+'/products/'+productId,formData);
  }

  deleteTaskProduct(taskId: number, productId: number): Observable <any>{
    return this.http.delete(this.endpoint+'/'+taskId+'/products/'+productId);
  }


  // Product file
  patchTaskProductFile(taskId: number, productId: number, fileId: number, formData: FormData): Observable <any>{
    return this.http.patch(this.endpoint+'/'+taskId+'/products/'+productId+'/files/'+fileId,formData);
  }

  deleteTaskProductFile(taskId: number, productId: number, fileId: number): Observable <any>{
    return this.http.delete(this.endpoint+'/'+taskId+'/products/'+productId+'/files/'+fileId);
  }
  */

}
