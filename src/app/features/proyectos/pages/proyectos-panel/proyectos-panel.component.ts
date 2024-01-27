import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { ModalAgregarAccionPanelProyectoComponent } from '../../components/modal-agregar-accion-panel-proyecto/modal-agregar-accion-panel-proyecto.component';
import { ModalAgregarColaboradorPanelProyectoComponent } from '../../components/modal-agregar-colaborador-panel-proyecto/modal-agregar-colaborador-panel-proyecto.component';
import { ModalAgregarTareaPanelProyectoComponent } from '../../components/modal-agregar-tarea-panel-proyecto/modal-agregar-tarea-panel-proyecto.component';
import { ModalAgregarPlantillatareasPanelProyectoComponent } from '../../components/modal-agregar-plantillatareas-panel-proyecto/modal-agregar-plantillatareas-panel-proyecto.component';
import { ModalEditarAccionPanelProyectoComponent } from '../../components/modal-editar-accion-panel-proyecto/modal-editar-accion-panel-proyecto.component';
import { ModalEliminarAccionPanelProyectoComponent } from '../../components/modal-eliminar-accion-panel-proyecto/modal-eliminar-accion-panel-proyecto.component';
import { ModalOpcionesColaboradorPanelProyectoComponent } from '../../components/modal-opciones-colaborador-panel-proyecto/modal-opciones-colaborador-panel-proyecto.component';
import { ModalOpcionesTareasPanelProyectosComponent } from '../../components/modal-opciones-tareas-panel-proyectos/modal-opciones-tareas-panel-proyectos.component';
import { ProyectosService } from '../../services/proyectos.service';
import { ProyectosPlantillaModel } from 'src/app/core/models/proyectos/proyectos_plantilla-model';
import { EstatusProyectoEnum } from 'src/app/core/enums/estatus-proyecto.enum';
import { RolProyecto } from 'src/app/core/enums/rol-proyecto.enum';
import { Utils } from 'src/app/core/utils/utils';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { UsersService } from 'src/app/features/users/services/users.service';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { ProyectosHistoricoModel } from 'src/app/core/models/proyectos/proyectos_historico-model';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
import { TareasModel } from 'src/app/core/models/tareas/tareas-model';
import { MeetingsModel } from 'src/app/core/models/meetings/meetings-model';
import { MeetingCuentasModel } from 'src/app/core/models/meetings/meeting_cuentas-model';
import { ZoomMeetingModel } from 'src/app/core/models/meetings/zoom_meeting-model';
import { ZoomMeetingRecurrence } from 'src/app/core/models/meetings/zoom_meeting_recurrence-model';
import { ZoomMeetingSettingsModel } from 'src/app/core/models/meetings/zoom_meeting_seetings-model';
import { ModalCreateMeetingPanelProyectoComponent } from '../../components/modal-create-meeting-panel-proyecto/modal-create-meeting-panel-proyecto.component';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';

@Component({
  selector: 'app-proyectos-panel',
  templateUrl: './proyectos-panel.component.html',
  styleUrls: ['./proyectos-panel.component.css']
})
export class ProyectosPanelComponent implements OnInit {

  history: ProyectosHistoricoModel = new ProyectosHistoricoModel();  
  estatuses: any = null;
  session: any = null;
  idProyecto: number = null;
  proyecto: ProyectosModel = new ProyectosModel();
  idUsuario: number = null;
  usuario: UsuarioModel = null;

  estatusList: any = null;
  rolesList: any = RolProyecto;
  proyectoPlantillas: ProyectosPlantillaModel[] = [];

  archivos: any = [];
  showFilesUploader = false;

  cuentaMeeting: MeetingCuentasModel = new MeetingCuentasModel();
  zoomMeeting: ZoomMeetingModel = new ZoomMeetingModel();
  zoomMeetingRecurrence: ZoomMeetingRecurrence = new ZoomMeetingRecurrence();
  zoomMeetingSettings: ZoomMeetingSettingsModel = new ZoomMeetingSettingsModel();
  meetingModel: MeetingsModel = new MeetingsModel();
  minDate: string = this.utils.parseDateToYYYYMMDDHHiiss_ISO8601(new Date()).replace(' ', 'T');

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private proyectosService: ProyectosService,
    private catalogoService: CatalogoService,
    private coreAuth: CoreAuthService,
    private dialog: MatDialog,
    public utils: Utils,
  ) {}

  ngOnInit() {
    this.session = this.coreAuth.getUserSessionData();
    this.getUserById();
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.getCatalogoEstatus();
    this.getPanelProyecto(this.idProyecto);
  }

  async getUserById() {
    await this.usersService.findById(this.session.idUsuario).subscribe((response) => {
      this.usuario = response;
    });
  }

  async getPanelProyecto(idProyecto: number) {
    await this.proyectosService.findById(idProyecto).subscribe((response) => {
      this.proyecto = response;
      console.log( this.proyecto );
    });
  }

  async getCatalogoEstatus(){    
    this.catalogoService.getAllByTipoCatalogo('ESTATUS_PROYECTOS').subscribe(data => {
      
      if (data.length > 0) {
        this.estatusList = data;
      }
      
    });
  }  

  sortHistory(history: ProyectosHistoricoModel[]) {
    return history.sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
  }

  changeProbabilidadEstatus() {
    let
      proyectoHistorico: ProyectosHistoricoModel = new ProyectosHistoricoModel(),
      dateNow = new Date();
      
    proyectoHistorico.usuarioId = this.usuario;
    proyectoHistorico.accion = '<b>' + this.usuario.nombre + "</b> ha cambiado la probabilidad del proyecto <b>" + this.proyecto.nombre + "</b> a <b>" + this.proyecto.estatus + "</b>.";
    proyectoHistorico.tipoId = null;
    proyectoHistorico.createdAt = dateNow;
    proyectoHistorico.updatedAt = dateNow;

    this.proyecto.historico.push(proyectoHistorico);
    this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
      this.proyecto = response;
    });
  }

  // // Modales histórico
  openNewActionModal() {
    this.dialog.open(ModalAgregarAccionPanelProyectoComponent, {
      width: '80%'
    }).afterClosed().subscribe((proyectoHistorico: ProyectosHistoricoModel) => {
      if (proyectoHistorico) {
        proyectoHistorico.usuarioId = this.usuario;
        this.proyecto.historico.push(proyectoHistorico);
        this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
          this.proyecto = response;
        });
      }
    });
  }
  openEditActionModal(proyectoHistorico: ProyectosHistoricoModel) {
    this.dialog.open(ModalEditarAccionPanelProyectoComponent, {
      width: '80%',
      data: {
        proyectoHistorico: proyectoHistorico
      },
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        let historyProjectIndex = this.proyecto.historico.findIndex(item => item.id === resp.id);
        this.proyecto.historico[historyProjectIndex] = resp;
        this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
          this.proyecto = response;
        });
      }
    });
  }
  openDeleteActionModal(proyectoHistorico: ProyectosHistoricoModel) {
    this.dialog.open(ModalEliminarAccionPanelProyectoComponent, {
      width: '80%',
      data: {
        proyectoHistorico: proyectoHistorico
      },
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        let historyProjectIndex = this.proyecto.historico.findIndex(item => item.id === resp.id);
        if (historyProjectIndex > -1) {
          this.proyecto.historico.splice(historyProjectIndex, 1);
          this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
            this.proyecto = response;
          });
        }
      }
    });
  }

  // // Modales colaborador
  openNewColaboradorModal() {
    const dialogRef = this.dialog.open(ModalAgregarColaboradorPanelProyectoComponent, {
      width: '80%',
    }).afterClosed().subscribe((colaborador) => {
      if (colaborador) {
        this.proyecto.colaboradores.push(colaborador);
        this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
          this.proyecto = response;
        });
      }
    });
  }
  openOptionsColaboradorModal(proyectoColaborador: ProyectosColaboradorModel) {
    this.dialog.open(ModalOpcionesColaboradorPanelProyectoComponent, {
      width: '80%',
      data: {
        proyectoColaborador: proyectoColaborador,
      },
    }).afterClosed().subscribe((colaborator) => {
      debugger;
      if (colaborator) {
        let send = false;
        let historyColaboratorIndex = this.proyecto.colaboradores.findIndex(item => item.id === colaborator.proyectoColaborador.id);
        if (colaborator.request === 'edit') {
          this.proyecto.colaboradores[historyColaboratorIndex] = proyectoColaborador;
          send = true;
        }
        if (colaborator.request === 'delete') {
          if (historyColaboratorIndex > -1) {
            this.proyecto.colaboradores.splice(historyColaboratorIndex, 1);
            send = true;
          }
        }
        if (send) {
          this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
            this.proyecto = response;
          });
        }
      }
    }
    );
  }

  // // Modales Tareas
  openNewTareaModal(){
    this.dialog.open(ModalAgregarTareaPanelProyectoComponent, {
      width: '80%',
      data: {colaboratorsList: this.proyecto.colaboradores},
      }).afterClosed().subscribe((task)=>{
        if(task){
          let taskNumber = this.proyecto.proyectoTareas.length + 1;
          task.task.tarea = this.proyecto.nombre+" - Tarea "+taskNumber;
          this.proyecto.proyectoTareas.push(task.task);
          this.proyecto.historico.push(task.history);
          this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
            this.proyecto = response;
          });
        }
      });
  }
  openOptionsTareasModal(task: TareasModel){
    this.dialog.open(ModalOpcionesTareasPanelProyectosComponent, {
      width: '80%',
      data: {
        task: task,
        colaboratorsList: this.proyecto.colaboradores,
      },
    }).afterClosed().subscribe((task)=>{
      if(task){
        let taskIndex = (this.proyecto.proyectoTareas).findIndex(item => item.id === task.id);
        this.proyecto.proyectoTareas[taskIndex] = task;
        this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
          this.proyecto = response;
        });
      }
    });
  }

  // // Modales Plantillas
  openNewPlantillasModal(){
    this.dialog.open(ModalAgregarPlantillatareasPanelProyectoComponent, {
      width: '80%',
      data: {
        proyecto: this.proyecto,
        usuarioSesion: this.session.idUsuario,
        listaPlantillas: this.proyectoPlantillas
      },
      }).afterClosed().subscribe((plantilla)=>{
        let
        date = new Date(),
        task: TareasModel = new TareasModel();
        plantilla.forEach(tarea => {          
          task = new TareasModel();
          task.tarea = tarea.descripcion;
          task.descripcion = "";
          task.entregable = tarea.entregable;
          task.fechaTermino = new Date( date.getFullYear(),date.getMonth(),date.getDate() + tarea.dias ,23,59,59,0);
          task.fechaInicio = date;
          task.estatus = false;
          task.usuarioId = this.usuario;
          task.createdAt = date;
          task.updatedAt = date;
      
          this.history.accion = "Se ha asignado la tarea " + task.tarea + ", para entregar en fecha límite "+new Date(task.fechaTermino).toLocaleDateString('ES');
          this.history.tipoId = null;
          this.history.createdAt = date;
          this.history.updatedAt = date;
          this.history.usuarioId = task.usuarioId;          
          this.proyecto.proyectoTareas.push(task);                   
        });
        console.log(this.proyecto); 
        this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
          this.proyecto = response;
        });
      });
  }

  openNewMeetingModal(){
    this.dialog.open(ModalCreateMeetingPanelProyectoComponent, {
      width:'80%',
    }).afterClosed().subscribe((resp) => {
      if(resp){
        resp.start_time = new Date(resp.start_time);
        let 
          date = new Date(),
          user = this.proyecto.colaboradores.filter(item => item.rol === 'responsable')[0].usuarioId,
          historico = new ProyectosHistoricoModel(),
          meetingResponse = JSON.parse(resp.apiResponse);
          
        historico.accion = '<b>Meeting agendado</b> <br> <a href="'+meetingResponse.join_url+'" target="_BLANK">'+meetingResponse.join_url+'</a>';
        historico.usuarioId = user;
        historico.meetings = [resp];
        historico.tipoId = null;
        historico.createdAt = date;
        historico.updatedAt = date;
        
        this.proyecto.historico.push(historico);
        this.proyectosService.updateByPanel(this.proyecto).subscribe((response) => {
          this.proyecto = response;
        });

        this.proyecto.colaboradores.forEach(item =>{
          const formData = new FormData();
        
          formData.append("correo", item.usuarioId.email );
          formData.append("mensaje", "Se ha agendado una reunión virtual, para el proyecto: " + this.proyecto.nombre + ", para lo cual adjuntamos el link de acceso: " + meetingResponse.join_url + ", para mas información consulte su panel de seguimiento de proyectos" );

          this.proyectosService.enviarCorreo( formData).subscribe((response) => {
            console.log( response );
          });
        });
          
        
      }
    });
  }

}
