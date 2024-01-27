import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { AgendaRequest } from 'src/app/core/utils/requests/agenda/Agenda.request';
import { AgendaListRequest } from 'src/app/core/utils/requests/agenda/AgendaList.request';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  endpoint: string = environment.apiUrl+"/agenda"

  constructor(
    private http: HttpClient
  ) { }

  getPageAgenda(agendaListRequest: AgendaListRequest): Observable<any>{
    let params = new HttpParams();
    for(let i in agendaListRequest){
      if(!(agendaListRequest[i] === null || agendaListRequest[i] === '')){
        params = params.append(i,agendaListRequest[i]);
      }
    }
    return this.http.get(this.endpoint,{ params: params});
  }

  postAgenda(agendaRequest: AgendaRequest): Observable<any>{
    return this.http.post(this.endpoint,agendaRequest);
  }

  putAgenda(agendaId:number,agendaRequest:AgendaRequest): Observable <any>{
    return this.http.put(this.endpoint+"/"+agendaId,agendaRequest);
  }
  deleteAgenda(agendaId:number): Observable<any>{
    return this.http.delete(this.endpoint+"/"+agendaId);
  }
}
