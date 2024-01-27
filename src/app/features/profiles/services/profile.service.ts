import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl: String = environment.apiUrl + '/profiles'

  constructor(
    private http: HttpClient
  ) { }

  getPages(pageRequestParams: PageRequestParams): Observable<PageModel>{
    let queryParams = new HttpParams();
    for(let i in pageRequestParams){
      if(!(pageRequestParams[i] === null || pageRequestParams[i] === '')){
        queryParams = queryParams.append(i,pageRequestParams[i]);
      }
    }
    return this.http.get<PageModel>(this.baseUrl+"/page",{params: queryParams});
  }

  getFormResources(profileId: number): Observable<any>{
    return this.http.get<any>(this.baseUrl+"/"+profileId+"/formResources");
  }

  getOrganizationChart(): Observable<any>{
    return this.http.get(this.baseUrl+'/organizationChart');
  }

  findById(profileId: string): Observable<any>{
    return this.http.get(this.baseUrl+"/"+profileId);
  }

  postProfile(profile: any): Observable<any>{
    return this.http.post(this.baseUrl+"/",profile);
  }

  putProfile(profile: any): Observable<any>{
    return this.http.put(this.baseUrl+"/"+profile.id,profile);
  }

  deleteProfile(profileId: number): Observable<any>{
    return this.http.delete(this.baseUrl+'/'+profileId);
  }

  updateStatusProfile(profileId: number, status: boolean):Observable<any>{
    return this.http.patch(this.baseUrl+'/'+profileId+'/status/'+status,null);
  }

  filterByAreaAndLevel(area: string, level: number): Observable<any>{
    return this.http.get(this.baseUrl+"/filterByArea/"+area+"/level/"+level);
  }
}
