import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private accessToken = environment.mapBoxToken;
  private geocodingURI = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

  constructor(
    private http: HttpClient,
  ) { }

  geocodingByZipcode(zipcode: string): Observable <any>{
    return this.http.get(this.geocodingURI+zipcode+'.json?access_token='+this.accessToken);
  }

}
