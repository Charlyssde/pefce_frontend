import { SolicitudesModel } from './../../../core/models/solicitudes/solicitudes-model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageModel } from 'src/app/core/utils/responses/page.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private endpoint = environment.apiUrl+'/solicitudes';

  constructor(
    private http: HttpClient
  ) { }

  getPages(pageRequestParams: any, perfil: any): Observable<PageModel>{
    let queryParams = new HttpParams();
    for(let i in pageRequestParams){
      if(!(pageRequestParams[i] === null || pageRequestParams[i] === '')){
        queryParams = queryParams.append(i,pageRequestParams[i]);
      }
    }
    return this.http.get<PageModel>(this.endpoint+"/page/" + perfil,{params: queryParams});
  }

  pageAll():Observable <any>{
    return this.http.get(this.endpoint+"/page");
  }

  formRequiredData(idSolicitud: number):Observable<any>{
    return this.http.get(this.endpoint+"/formRequiredData/"+idSolicitud);
  }
  createSolicitud(solicitud: SolicitudesModel):Observable <any> {
    return this.http.post(this.endpoint+'/create',solicitud);
  }
  updateSolicitud(solicitud: SolicitudesModel):Observable<any>{
    return this.http.put(this.endpoint+'/update',solicitud);
  }

  reportesolicitudes():Observable <any>{
    return this.http.get(this.endpoint+"/reportesolicitudes");
  }

}
