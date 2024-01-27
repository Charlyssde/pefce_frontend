import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
import { ProyectosPlantillaModel } from 'src/app/core/models/proyectos/proyectos_plantilla-model';
import { ProyectosHistoricoModel } from 'src/app/core/models/proyectos/proyectos_historico-model';
import { TasksModel } from 'src/app/core/models/tareas/tasks-model';
import { MainRequestFilter } from 'src/app/core/utils/requests/filters/main-request-filter.model';
import { ProjectRequest } from 'src/app/core/utils/requests/projects/project.request';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {


  private baseUrl = environment.apiUrl + '/projects';

  constructor(
    private http: HttpClient
  ) { }

  prioridad=[
    'Normal',
    'Importante',
    'Importante/Urgente',
    'Urgente'
  ];

  roles=[
    'Responsable',
    'Contacto',
    'Mediador',
    'Proveedor',
    'Comprador',
    'Colaborador'
  ];
  //#region Proyectos
  getPages(pageRequestParams: MainRequestFilter, empresaid: any): Observable<PageModel>{
    let queryParams = new HttpParams();
    for(let i in pageRequestParams){
      
      if(!(pageRequestParams[i] === null || pageRequestParams[i] === '')){
        queryParams = queryParams.append(i,pageRequestParams[i]);
      }
    }
    queryParams.append("empresaid", empresaid);
    return this.http.get<PageModel>(this.baseUrl+"/page/"+empresaid,{params: queryParams});
  }
  
  
  page(): Observable<any> {
    return this.http.get(`${this.baseUrl}/page`);
  }
  formRequiredData(idProyecto: number): Observable <any>{
    return this.http.get(this.baseUrl+'/formRequiredData/'+idProyecto);
  }
  create(projectRequest: ProjectRequest): Observable<any> {
    return this.http.post(this.baseUrl, projectRequest);
  }
  update(projectRequest: ProjectRequest, id: number): Observable<any> {
    return this.http.put(this.baseUrl+'/'+id, projectRequest);
  }
  updateByPanel(project: ProyectosModel): Observable<any> {
    console.log(project);
    return this.http.put(this.baseUrl+'/'+project.id+"/panel", project);
  }
  findById(id: number): Observable<any> {
    return this.http.get(this.baseUrl+'/'+id);
  }
  findByStatusId(idStatus: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findByEstatusId/${idStatus}`);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }
  //#endregion Proyectos

  //#region Pipeline
  updateStatus(idProyecto: number, idEstatus: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${idProyecto}/${idEstatus}`,null);
  }
  //#endregion Pipeline

  //#region Panel de proyecto
  getPanelProyecto(idProyecto: number, idUsuario: number): Observable <any>{
    return this.http.get(this.baseUrl+"/panelProyecto/"+idProyecto+"/"+idUsuario);
  }
  // Historico
  createHistoricoByProyecto(idProyecto: number,historico: ProyectosHistoricoModel): Observable<any>{
    return this.http.post(this.baseUrl+'/panelProyecto/'+idProyecto+'/historico',historico);
  }
  updateHistoricoByProyecto(idProyecto: number, historico: ProyectosHistoricoModel): Observable<any>{
    return this.http.put(this.baseUrl+'/panelProyecto/'+idProyecto+'/historico',historico);
  }
  deleteHistoricoByProyecto(idProyecto: number, historico: ProyectosHistoricoModel): Observable<any>{
    return this.http.delete(this.baseUrl+'/panelProyecto/'+idProyecto+'/historico/'+historico.id,);
  }
  // Colaboradores
  createColaboradorByProyecto(idProyecto: number, idUsuarioSesion: number, colaborador: ProyectosColaboradorModel): Observable <any>{
    return this.http.post(this.baseUrl+'/panelProyecto/'+idProyecto+'/colaborador/'+idUsuarioSesion,colaborador);
  }
  updateColaboradorByProyecto(idProyecto: number, idUsuarioSesion:number,colaborador: ProyectosColaboradorModel,): Observable <any>{
    return this.http.put(this.baseUrl+'/panelProyecto/'+idProyecto+'/colaborador/'+idUsuarioSesion,colaborador);
  }
  deleteColaboradorByProyecto(idProyecto: number, idUsuarioSesion:number, idColaborador: number ): Observable<any>{
    return this.http.delete(this.baseUrl+'/panelProyecto/'+idProyecto+'/colaborador/'+idColaborador+'/'+idUsuarioSesion);
  }
  // Tareas
  createTareaByProyecto(idProyecto:number, idUsuarioSesion: number, tarea: TasksModel): Observable <any>{
    return this.http.post(this.baseUrl+'/panelProyecto/'+idProyecto+'/tarea/'+idUsuarioSesion,tarea);
  }
  updateTareaByProyecto(idProyecto:number, idUsuarioSesion: number, tarea: TasksModel): Observable <any>{
    return this.http.put(this.baseUrl+'/panelProyecto/'+idProyecto+'/tarea/'+idUsuarioSesion,tarea);
  }
  //#endregion Panel de proyecto
  // Colaboradores
  createPlantillaTareasByProyecto(idProyecto: number, idUsuarioSesion: number, plantillaId: number): Observable <any>{
    return this.http.post(this.baseUrl+'/panelProyecto/'+idProyecto+'/plantilla/'+idUsuarioSesion+'/idPlantilla/'+plantillaId, null);
  }

  reportesolicitudes():Observable <any>{
    return this.http.get(this.baseUrl+"/reportesolicitudes");
  }  
 
  enviarCorreo(correo: any): Observable<any> {
    return this.http.post(this.baseUrl + "/enviarcorreo", correo);
  }

}
