import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { CoreAuthService } from '../services/core-auth.service';
import { Alerts } from '../utils/alerts';
import { RefreshTokenRequest } from '../utils/requests/auth/refresh-token-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  userId: number = null;

  constructor(
    private router: Router,
    private coreAuthService: CoreAuthService,
    private alerts: Alerts
  ){
    this.userId = (this.coreAuthService.getUserSessionData() ? this.coreAuthService.getUserSessionData().idUsuario : 0);
  
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedRol = route.data.expectedRol;
    const sesion = localStorage.getItem('session');

    if (sesion != null) {
      const rol = this.coreAuthService.getCanActivatedByRol(expectedRol);
      if (rol) {
        const token = localStorage.getItem('token');
        const isRefreshSuccess = await this.refreshingTokens(token);
        if (!isRefreshSuccess) {
          await this.coreAuthService.logout().subscribe(async data=>{
            localStorage.removeItem('token');
            localStorage.removeItem('sesion');
            localStorage.clear();
            setTimeout(()=>{ this.router.navigate([""]); },1000);
          }, error => {
            this.alerts.printErrorSnackBar(error);
          });
        }
        return isRefreshSuccess;
      }
    }
    else{
      localStorage.removeItem('token');
      localStorage.removeItem('sesion');
      localStorage.clear();
      setTimeout(()=>{ this.router.navigate([""]); },1000);
      return false;
    }
  }

  private async refreshingTokens(token: string | null): Promise<boolean> {
    if (!token) { return false; }
    let isRefreshSuccess: boolean;
    try {
      let refreshTokenRequest: RefreshTokenRequest = new RefreshTokenRequest();
      refreshTokenRequest.userId = this.userId;
      const response = await this.coreAuthService.refreshToken(refreshTokenRequest, token).toPromise();
      const refreshToken = (<any>response.token);
      localStorage.setItem("token", refreshToken);
      isRefreshSuccess = true;
    }
    catch (exception) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}



// function lastValueFrom(arg0: Observable<string>) {
//   throw new Error('Function not implemented.');
// }
  
