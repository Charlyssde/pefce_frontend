import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { SolicitudAccesoEmpresaModel } from 'src/app/core/models/empresas/solicitud-acceso-empresa.model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { EnterpriseRequestFilter } from 'src/app/core/utils/requests/enterprises/enterprise-request-filter.request';
import { UserRequest } from 'src/app/core/utils/requests/users/user.request';
import { PageModel } from 'src/app/core/utils/responses/page.model';

@Injectable({
  providedIn: 'root'
})
export class EnterprisesService {

  baseUrl: string = environment.apiUrl;
  endpoint: string = environment.apiUrl + "/enterprises"
  private baseUrlEvents = environment.apiUrl + '/eventos';

   endpointEvento: string = environment.apiUrl + "/userEnterprise"

  constructor(
    private http: HttpClient
  ) { }

  findById(enterpriseId: number): Observable<any> {
    return this.http.get(this.endpoint + "/" + enterpriseId);
  }

  getAllWithFilters(enterpriseRequestFilter: EnterpriseRequestFilter): Observable<any> {
    let queryParams = new HttpParams();
    for (let i in enterpriseRequestFilter) {
      if(enterpriseRequestFilter[i] !== null){
        queryParams = queryParams.append(i, enterpriseRequestFilter[i]);
      }
    }
    return this.http.get(this.endpoint+"/withFilter", { params: queryParams });
  }
  getPages(pageRequestParams: any): Observable<PageModel> {
    let queryParams = new HttpParams();
    for (let i in pageRequestParams) {
      if (!(pageRequestParams[i] === null || pageRequestParams[i] === '')) {
        queryParams = queryParams.append(i, pageRequestParams[i]);
      }
    }
    return this.http.get<PageModel>(this.endpoint + "/page", { params: queryParams });
  }

  getEnterprisesFilters(): Observable<any> {
    return this.http.get(this.baseUrl + '/shared/showEnterpriseRegistration');
  }

  showEnterpriseRegistration(): Observable<any> {
    return this.http.get(this.baseUrl + '/shared/showEnterpriseRegistration');
  }

  getFormResources(enterpriseId: number): Observable<any> {
    return this.http.get<any>(this.endpoint + "/" + enterpriseId + "/formResources");
  }

  postEnterprise(enterprise: any): Observable<any> {
    return this.http.post(this.endpoint, enterprise);
  }

  putEnterprise(enterpriseId: any, enterprise: any): Observable<any> {
    return this.http.put(this.endpoint + "/" + enterpriseId, enterprise);
  }

  putEnterpriseautorizado(enterpriseId: any, enterprise: any): Observable<any> {
    return this.http.put(this.endpoint + "/autorizado/" + enterpriseId, enterprise);
  }

  putEnterprisedesautorizado(enterpriseId: any, enterprise: any): Observable<any> {
    return this.http.put(this.endpoint + "/desautorizado/" + enterpriseId, enterprise);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.endpoint + "/findAll");
  }

  deleteEnterprise(enterpriseId: any): Observable<any> {
    return this.http.delete(this.endpoint + "/" + enterpriseId);
  }

  updateStatusEnterprise(enterpriseId, status): Observable<any> {
    return this.http.patch(this.endpoint + "/" + enterpriseId + "/status/" + status, null);
  }

  saveAccessRequest(solicitudAccesoEmpresa: SolicitudAccesoEmpresaModel): Observable<any> {
    return this.http.patch(this.endpoint + "/" + solicitudAccesoEmpresa.enterpriseId + "/access-request", solicitudAccesoEmpresa);
  }

  // Contacts
  postEnterpriseContact(enterpriseId: number, userRequest: UserRequest): Observable<any> {
    return this.http.post(this.endpoint + "/" + enterpriseId + "/contacts", userRequest);
  }

  patchEnterpriseContact(enterpriseId: number, userRequest: UserRequest): Observable<any> {
    return this.http.patch(this.endpoint + "/" + enterpriseId + "/contacts/" + userRequest.user.id, userRequest);
  }

  deleteEnterpriseContact(enterpriseId: number, contactId: number): Observable<any> {
    return this.http.delete(this.endpoint + "/" + enterpriseId + "/contacts/" + contactId);
  }

  updateStatusUser(enterpriseId: number, contactId: number, status: boolean): Observable<any> {
    return this.http.patch(this.endpoint + '/' + enterpriseId + '/contacts/' + contactId + '/status/' + status, null);
  }

  passwordRecovery(enterpriseId: number, contactId: number, passwordRecoveryData: any): Observable<any> {
    return this.http.post(this.endpoint + "/" + enterpriseId + "/contacts/" + contactId + "/password-recovery", passwordRecoveryData);
  }

  changePrincipalContact(enterpriseId: number, principal: UsuarioModel): Observable<any> {
    return this.http.patch(this.endpoint + "/" + enterpriseId + "/contacts/change-principal", principal);
  }

  pageContactosByIdDirectorio(idDirectorio: number): Observable<any> {
    return this.http.get(`${this.endpoint}/pageContactosByIdDirectorio/${idDirectorio}`);
  }

  createContactoDirectorio(data: any): Observable<any> {
    return this.http.post(`${this.endpoint}` + '/createContactoDirectorio', data);
  }

  // Trade image
  getEnterpriseTradeImage(enterpriseId: number): Observable<any> {
    return this.http.get(this.endpoint + '/' + enterpriseId + '/trade-image');
  }
  postEnterpriseTradeImage(enterpriseId: number, formData: FormData): Observable<any> {
    return this.http.post(this.endpoint + '/' + enterpriseId + '/trade-image', formData);
  }

  // Products
  postEnprerpriseProduct(enterpriseId: number, formData: FormData): Observable<any> {
    return this.http.post(this.endpoint + '/' + enterpriseId + '/products', formData);
  }

  patchEntrerpriseProduct(enterpriseId: number, productId: number, formData: FormData): Observable<any> {
    return this.http.patch(this.endpoint + '/' + enterpriseId + '/products/' + productId, formData);
  }

  deleteEnterpriseProduct(enterpriseId: number, productId: number): Observable<any> {
    return this.http.delete(this.endpoint + '/' + enterpriseId + '/products/' + productId);
  }


  // Product file
  patchEnterpriseProductFile(enterpriseId: number, productId: number, fileId: number, formData: FormData): Observable<any> {
    return this.http.patch(this.endpoint + '/' + enterpriseId + '/products/' + productId + '/files/' + fileId, formData);
  }

  deleteEnterpriseProductFile(enterpriseId: number, productId: number, fileId: number): Observable<any> {
    return this.http.delete(this.endpoint + '/' + enterpriseId + '/products/' + productId + '/files/' + fileId);
  }


  // Scopes
  filterByTopic(topic: string): Observable<any> {
    return this.http.get(this.endpoint + '/filterByTopic/' + topic);
  }

  getActiveEnterprisesWithContacts(): Observable<any>{
    return this.http.get(this.endpoint + '/getActiveEnterprisesWithContacts');
  }

  getEnterpriseByUserId(id: number): Observable<any>{
    return this.http.get(this.endpoint + '/getEnterpriseByUserId/'+id);
  }

  reportesolicitudes():Observable <any>{
    return this.http.get(this.endpoint + "/reportesolicitudes");
  }


  findallempresas(): Observable<any> {
    return this.http.get(this.endpoint + "/all-empresas");
  }

  // EVENTO
  findEvents(): Observable<any> {
    return this.http.get(`${this.baseUrlEvents}/page`);
  }

  getUsuarioEmpresaPorEvento(eventoIds: any[]): Observable<any> {
    let params = new HttpParams();
    eventoIds.forEach(id => {
      params = params.append('eventoIds', id.toString());
    });
  
    return this.http.get(`${this.endpointEvento}/evento`, { params });
  }

}
