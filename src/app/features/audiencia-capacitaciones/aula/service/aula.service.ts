import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private baseUrl = environment.apiUrl + '/capacitaciones';

  constructor(
    private http: HttpClient
  ) { }

  validarAcceso(idCapacitacion: number, idUsuario: number): Observable<any> {
    var data = {
      idCapacitacion: idCapacitacion,
      idUsuario: idUsuario
    }
    return this.http.post(`${this.baseUrl}` + '/usuarioCapacitacion/findByCapacitacionIdAndUsuarioId', data);
  }

  finalizarCapacitacion(data: any): Observable<any>{
    data.updatedAt = new Date();
    return this.http.put(`${this.baseUrl}` + '/usuarioCapacitacion/finalizarCapacitacion', data);
  }

  validarConstancia(uuid: String): Observable<any>{
    return this.http.get(`${this.baseUrl}` + '/findUsuarioCapacitacionByUuid/' + uuid);
  }
}
