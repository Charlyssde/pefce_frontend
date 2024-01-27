import { MeetingsModel } from './../../../core/models/meetings/meetings-model';
import { MeetingCuentasModel } from './../../../core/models/meetings/meeting_cuentas-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  private endpoint = environment.apiUrl+"/meetings";
  private zommAuthEndpoint = environment.zoomAccountCredentialsEndpoint;

  constructor(
    private http: HttpClient
  ) { }

  // Zoom Endpoint requests
  // Get Auth Token Reference: https://zoom.us/oauth/token?grant_type=account_credentials&account_id={accountId}
  // API Endpoint reference: https://api.zoom.us/v2/users/{userID}
  getAuthTokenReference(meetingsAcountCredentialsRequest): Observable <any>{
    return this.http.post(this.endpoint+'/cuentas/verificarCredenciales',meetingsAcountCredentialsRequest);
  }



  // API Endpoint requests
  // Cuenta
  getCuentas(): Observable <any>{
    return this.http.get(this.endpoint+"/cuentas");
  }
  getFormRequiredData(idCuentaMeeting: number): Observable <any>{
    return this.http.get(this.endpoint+"/cuentas/formRequiredData/"+idCuentaMeeting);
  }
  createCuentas(meetingCuenta:MeetingCuentasModel):Observable <any>{
    return this.http.post(this.endpoint+"/cuentas",meetingCuenta);
  }
  updateCuentas(meetingCuenta:MeetingCuentasModel):Observable <any>{
    return this.http.put(this.endpoint+"/cuentas/"+meetingCuenta.id,meetingCuenta);
  }

  // Meetings
  getMeetingsCuenta(idCuentaMeeting:number):Observable<any>{
    return this.http.get(this.endpoint+'/cuentas/'+idCuentaMeeting+'/zoom');
  }
  meetingGetFormRequiredData(idCuentaMeeting: number, idMeeting: number): Observable <any>{
    return this.http.get(this.endpoint+"/cuentas/"+idCuentaMeeting+"/meetingFormRequiredData/"+idMeeting);
  }
  createMeetingCuenta(idCuentaMeeting: number,meeting: MeetingsModel): Observable<any>{
    return this.http.post(this.endpoint+'/cuentas/'+idCuentaMeeting+'/zoom',meeting);
  }
  updateMeetingCuenta(idCuentaMeeting: number,idMeeting: number, meeting: MeetingsModel): Observable<any>{
    return this.http.post(this.endpoint+'/cuentas/'+idCuentaMeeting+'/zoom/'+idMeeting,meeting);
  }

  // Scopes
  getAccountsBySelect():Observable<any>{
    return this.http.get(this.endpoint+"/getAccountsBySelect");
  }
}
