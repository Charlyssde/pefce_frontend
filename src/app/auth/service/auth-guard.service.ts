
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ScriptsGlobalService } from '../../common/scripts-global.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable,timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  idUsuario = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private scriptGL: ScriptsGlobalService,
  ) {
    this.idUsuario = this.scriptGL.getUserSessionData().idUsuario;
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedRol = route.data.expectedRol;
    const sesion = localStorage.getItem('session');
    if (sesion) {
      const rol = this.scriptGL.getCanActivatedByRol(expectedRol);
      if (rol) {
        const token = localStorage.getItem('token');

        const isRefreshSuccess = await this.refreshingTokens(token);
        if (!isRefreshSuccess) {
          const userData = this.scriptGL.getUserSessionData();
          await this.scriptGL.closeSesionLog(userData).subscribe(async data=>{
            const dataR = data;
            localStorage.clear();
            this.router.navigate(["inicio"]).then(()=>{
              setTimeout(()=>{ window.location.reload() },100);
            });
          }, error => {
            this.scriptGL.printErrorSnackBar(error);
          });
        }

        return isRefreshSuccess;
      }
    }
    else{
      localStorage.removeItem('token');
      localStorage.removeItem('sesion');
      this.router.navigate(['inicio']);
      return false;
    }
  }



  private async refreshingTokens(token: string | null): Promise<boolean> {
    if (!token) {
      return false;
    }

    let isRefreshSuccess: boolean;
    try {
      const response = await (this.http.get(environment.apiUrl + "/auth/token/"+this.idUsuario, {responseType: "text", headers:{"authorization":token}})).toPromise();
      const newToken = (<any>response);
      localStorage.setItem("token", newToken);
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }


}


function lastValueFrom(arg0: Observable<string>) {
  throw new Error('Function not implemented.');
}

