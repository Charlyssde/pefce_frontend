import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PageModel } from 'src/app/core/utils/responses/page.model';

@Injectable({
  providedIn: 'root'
})
export class ExplorersService {

  baseUrl: string = environment.apiUrl;
  endpoint: string = environment.apiUrl+"/explorers"

  constructor(
    private http: HttpClient
  ) { }

  getPages(pageRequestParams: any,explorer:string): Observable<PageModel>{
    let queryParams = new HttpParams();
    for(let i in pageRequestParams){
      if(!(pageRequestParams[i] === null || pageRequestParams[i] === '')){
        queryParams = queryParams.append(i,pageRequestParams[i]);
      }
    }
    return this.http.get<PageModel>(this.endpoint+"/"+explorer+"/page",{params: queryParams});
  }
}
