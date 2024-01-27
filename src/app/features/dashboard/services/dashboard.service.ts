import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private msInDay = (1000 * 60 * 60 * 24);
  private baseUrl = environment.apiUrl + '/dashboard';

  constructor(
    private http: HttpClient
  ) { }

  getLastActiveProjects(): Observable<any> {
    return this.http.get(environment.apiUrl+"/projects/getLastActiveProjects/10");
  }
  getLastNotifications(): Observable<any> {
    return this.http.get(environment.apiUrl+"/notifications/getLastNotifications/10");
  }

  getDashboardData(usuarioId: number, perfil: string): Observable<any> {
    return this.http.get(this.baseUrl + '/home/' + usuarioId + '/' + perfil);
  }

  putReadNotification(notificationId: number): Observable <any>{
    return this.http.put(environment.apiUrl+"/notificaciones/leerNotificacion/"+notificationId,{});
  }


  getNotificationType(type:number):String{
    let type_name = "Ninguno";
    switch(type){
      case 1: type_name="Automatica para usuario"; break;
      case 2: type_name="Automatica para canal"; break;
      case 3: type_name="Memorandum para usuario"; break;
      case 4: type_name="Memorandum para canal"; break;
    }
    return type_name;
  }

  setAsReaded(notificacion: any): Observable<any> {
    return this.http.post(environment.apiUrl+"/notifications/setasreaded", notificacion);
  }  
}
