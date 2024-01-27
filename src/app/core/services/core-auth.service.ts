import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { Observable, timer } from 'rxjs';
import { SesionModel } from '../models/auth/session-model';
import { ErrorLogModel } from '../models/logs/error-log.model';
import { OperationLogModel } from '../models/logs/operation-log..model';
import { LogoutRequest } from '../utils/requests/auth/logout-request.model';
import { RefreshTokenRequest } from '../utils/requests/auth/refresh-token-request.model';

@Injectable({
  providedIn: 'root'
})
export class CoreAuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private baseUrl = environment.apiUrl;
  private errorLog : ErrorLogModel;
  private operationLog: OperationLogModel;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
  ) { }

  logout(): Observable<any> {
    let 
      session = this.getUserSessionData(),
      logoutRequest: LogoutRequest = new LogoutRequest();
      logoutRequest.sessionId = session.idSesion;
    return this.http.post(this.baseUrl+"/auth/logout",logoutRequest);
  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest, token: string): Observable<any>{
    return this.http.post(this.baseUrl+'/auth/refresh-token',refreshTokenRequest,{headers:{"authorization":"Bearer "+token}});
  }

  isExpired(): boolean {
    const token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }

  getUserSessionData() {
    if(localStorage.getItem('session')){
      let userData: SesionModel = JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('session')))));
      return userData;
    }
    return null;
  }

  getCanActivatedByRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol ? true : (url === '/dashboard' ? true : false);
  }

  getCanCreateRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canCreate;
  }

  getCanUpdateRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canUpdate;
  }

  getCanDeleteRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canDelete;
  }

  getCanShowRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canShow;
  }

  getCanReportRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canReport;
  }

  // createLogsErrorService(error: any): Observable<any> {
  //   const userData = this.getUserSessionData();
  //   this.errorLog = new ErrorLogModel();
  //   const errorModel = {
  //     url: document.location.href,
  //     error: error,
  //     user: userData.idUsuario
  //   };
  //   this.errorLog.id = null;
  //   this.errorLog.error = JSON.stringify(errorModel);
  //   this.errorLog.fechaHora = new Date();
  //   return this.http.post(`${this.baseUrl}` + '/auth/error/create', this.errorLog);
  // }

  closeSesionLog(userData): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/sesion/closeSesion/${userData.idSesion}`);
  }

  // createLogsOperacionService(operacion: string, data: any): Observable<any> {
  //   const userData = localStorage.getItem('session') ? this.getUserSessionData() : null;
  //   this.operationLog = new OperationLogModel();
  //   this.operationLog.id = null;
  //   this.operationLog.idUsuario = userData ? userData.idUsuario : 0;
  //   this.operationLog.url = document.location.href;
  //   this.operationLog.operacion = operacion;
  //   this.operationLog.fechaHora = new Date();
  //   this.operationLog.data = JSON.stringify(data);
  //   return this.http.post(`${this.baseUrl}` + '/auth/operacion/create', this.operationLog);
  // }

  async cerrarSesion(){
    const dataUser = this.getUserSessionData();
    this.snackBar.open('Su sesión ha caducado, se cerrará su sesión automaticamente, por favor espere.', 'Entendido', { duration: 3000 });
    await timer(5000).subscribe(async ()=>{
      await this.closeSesionLog(dataUser).subscribe(async data=>{
        this.router.navigate(['']);
        localStorage.clear();
        await timer(1000).subscribe(() => {
          scroll(0, 0);
          location.reload();
        });
      }, error => {
        // this.alerts.printErrorSnackBar(error);
      });
    });
  }
}
