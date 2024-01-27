import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MyProfileRequest } from 'src/app/core/utils/requests/auth/my-profile-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(loginData: any): Observable<any> {
    return this.http.post(this.endpoint+"/login", loginData);
  }
  
  setLoggedProfile(sessionId: number, profileId:number): Observable<any>{
    return this.http.post(this.endpoint+"/session/"+sessionId+"/profile/"+profileId,null);
  }
  
  passwordRecovery(passwordRecoveryData: any): Observable<any> {
    return this.http.post(this.endpoint+"/password-recovery", passwordRecoveryData);
  }
  
  enterpriseRegistration(enterprise: any): Observable<any> {
    return this.http.post(this.endpoint+"/enterprise-registration", enterprise);
  }

  getMyProfile(userId: number): Observable<any>{
    return this.http.get(this.endpoint+"/my-profile/"+userId);
  }

  updateProfile(myProfileRequest: MyProfileRequest): Observable<any>{
    return this.http.post(this.endpoint+'/my-profile',myProfileRequest);
  }
}
