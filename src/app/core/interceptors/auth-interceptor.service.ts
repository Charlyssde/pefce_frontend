import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CoreAuthService } from '../services/core-auth.service';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  token = null;
  constructor(
    private coreAuthService: CoreAuthService,
    private loaderService: LoaderService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');
    if(this.token != null && !this.token.includes("Bearer ")){
      this.token = "Bearer "+this.token;
    }
    this.totalRequests++;

    if (!req.url.includes('google')) {
      if (!req.url.includes('datamexico')) {
        if (!req.url.includes('mapbox')) {
          if (this.token) {
            if (!this.coreAuthService.isExpired()) {
              req = req.clone({
                setHeaders: { 'Authorization': this.token }
              });
            }
          }
        }
      }
    }
    this.loaderService.setLoading(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          setTimeout(() => {
            this.loaderService.setLoading(false);
          }, 500);
        }
      })
    );
  }
}
