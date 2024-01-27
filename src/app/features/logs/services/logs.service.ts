import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private _baseUrl: String = environment.apiUrl + '/logs';
  public get baseUrl(): String {
    return this._baseUrl;
  }
  public set baseUrl(value: String) {
    this._baseUrl = value;
  }

  constructor(
    private http: HttpClient
  ) { }

  getSessionsPages(pageRequestParams: PageRequestParams): Observable<PageModel>{
    let queryParams = new HttpParams();
    for(let i in pageRequestParams){
      if(!(pageRequestParams[i] === null || pageRequestParams[i] === '')){
        queryParams = queryParams.append(i,pageRequestParams[i]);
      }
    }
    return this.http.get<PageModel>(this.baseUrl+"/sessions",{params: queryParams});
  }
}
