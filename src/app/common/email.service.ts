import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = environment.apiUrl + "/masiveMail";  

  constructor(
    private http: HttpClient
  ) { }

  sendMasiveMail(arrayDestinos: Array<String>, asunto: string, mensaje: string): Observable<any> {
    const emailDTO = {
      destinos: arrayDestinos,
      asunto: asunto,
      mensaje: mensaje
    }
    return this.http.post(`${this.baseUrl}` + '/sendMasiveMail', emailDTO);
  }

  sendEmailWithDestinosAndMensajeToFrontEnd(arrayDestinos: Array<String>, asunto: string, mensaje: string, eshtml: boolean = false): Observable<any> {

    const mailgunUrl = environment.mailGunApiBaseUrl + '/messages';
    const mailgunApiKey = btoa('api:' + environment.mailGunApiKey)
    const dominio = environment.dominioFront;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + mailgunApiKey
    });

    const emailFrom = 'brad@mg.soluto.mx';
    const destinos = arrayDestinos.join(', ');
    var mensajeFinal = mensaje + '\n\n\nAtentamente, PEFCE APP VERACRUZ. \n\n\n\n' + dominio;
    if (eshtml) {
      mensajeFinal = '<html>' + mensaje + '<br><br><br>Atentamente, PEFCE APP VERACRUZ.<br><br><br><br>' + dominio + '</html>';
    }
    const formData =
      'from=' + emailFrom + '&' +
      'to=' + destinos + '&' +
      'subject=' + asunto + '&' +
      (eshtml ? 'html=' : 'text=') + mensajeFinal;

    return this.http.post(mailgunUrl, formData, { headers });
  }
}
