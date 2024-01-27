import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutodiagnosticoService {

  baseUrl: string = environment.apiUrl;
  endpoint: string = environment.apiUrl+"/autodiagnostico"

  constructor(
    private http: HttpClient
  ) { }

  postAutodiagnostico(autodiagnostico: any): Observable<any>{
    return this.http.post(this.endpoint, autodiagnostico);
  }

  getAutodiagnostico(autodiagnosticoId: any): Observable<any>{
    return this.http.get(this.endpoint +"/" + autodiagnosticoId);
  }

  deleteAutodiagnostico(autodiagnosticoId: any): Observable<any>{
    return this.http.delete(this.endpoint + "/" + autodiagnosticoId);
  }

  updateStatusAutodiagnostico(autodiagnosticoId, status): Observable<any>{
    return this.http.patch(this.endpoint+"/"+autodiagnosticoId+"/status/"+status,null);
  }

  putAutodiagnostico(autodiagnosticoId: any, autodiagnostico: any): Observable<any>{
    return this.http.put( this.endpoint + "/" + autodiagnosticoId, autodiagnostico );
  }

  deleteAutodiagnosticoFile(autodiagnosticoId: number,fileId: number): Observable <any>{
    return this.http.delete(this.endpoint+'/'+autodiagnosticoId+'/files/'+fileId);
  }

}
/*

  baseUrl: string = environment.apiUrl;
  endpoint: string = environment.apiUrl+"/autodiagnosticos"

  constructor(
    private http: HttpClient
  ) { }

  postAutodiagnostico(autodiagnostico: any): Observable<any>{
    return this.http.post(this.endpoint, autodiagnostico);
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

  deleteAutodiagnostico(autodiagnosticoId: any): Observable<any>{
    return this.http.delete(this.endpoint + "/" + autodiagnosticoId);
  }

  updateStatusAutodiagnostico(autodiagnosticoId, status): Observable<any>{
    return this.http.patch(this.endpoint+"/"+autodiagnosticoId+"/status/"+status,null);
  }

  putAutodiagnostico(autodiagnosticoId: any, autodiagnostico: any): Observable<any>{
    return this.http.put( this.endpoint + "/" + autodiagnosticoId, autodiagnostico );
  }

}

*/