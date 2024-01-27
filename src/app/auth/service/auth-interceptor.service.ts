import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { environment } from '@env/environment';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthAuthenticatedService } from './auth-authenticated.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  token = null;

  constructor(
    private authAuthenticated: AuthAuthenticatedService,
    private lib: ScriptsGlobalService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');
    if (!req.url.includes('api.mailgun.net')) {
      if (!req.url.includes('google')) {
        if (!req.url.includes('datamexico')) {
          if (!req.url.includes('mapbox')) {
            if (!req.url.includes('zoom.com')) {

              if (this.token) {
                if (!this.authAuthenticated.isExpired()) {
                  req = req.clone({
                    setHeaders: { 'Authorization': this.token }
                  });
                }
              }
            }
          }
        }

      }
    }
    return next.handle(req);
  }
}
