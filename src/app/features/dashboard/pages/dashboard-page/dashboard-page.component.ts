import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { NotificacionModel } from 'src/app/core/models/notificaciones/notificacion-model';
import { ShowProjectComponent } from '../../components/show-project/show-project.component';
import { ShowNotificationComponent } from '../../components/show-notification/show-notification.component';
import { DashboardService } from '../../services/dashboard.service';

import { AgendaListRequest } from 'src/app/core/utils/requests/agenda/AgendaList.request';
import { AgendaRequest } from 'src/app/core/utils/requests/agenda/Agenda.request';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { AgendaService } from 'src/app/features/agenda/services/agenda.service';
import { AgendaModel } from 'src/app/core/models/agenda/agenda.model';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from 'src/app/common/stomp.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  showUnreaded: boolean = false;

  loader: boolean = true;

  // Calendar options
  calendarHeight: number = 1;
  eventsList: AgendaModel[] = [];
  agendaListRequest: AgendaListRequest = new AgendaListRequest();
  agendaRequest: AgendaRequest = new AgendaRequest();
  activeProfile: any;
  userId: number;
  isEnterprise: boolean = true;
  viewDashboard: boolean = false;
  
  
  public projects: ProyectosModel[] = [];
  public notifications: NotificacionModel[] = [];
  public repoNotifications: NotificacionModel[] = [];
  // public events: EventoModel[] = [];
  public dates: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private coreAuthService: CoreAuthService,
    private agendaService: AgendaService,
    private alerts: Alerts,
    public dialog: MatDialog,
    private lib: ScriptsGlobalService,
    private router: Router,
    private route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit() {
    this.route.data 
      .subscribe(data => {        
        this.viewDashboard = data.viewDashboard;
    });     
    
    // if (this.coreAuthService.getUserSessionData().perfil.tipo == "empresa" && !this.viewDashboard ){
    //   this.router.navigateByUrl('/exploradores');
    // }else{
      this.isEnterprise = false;
      this.activeProfile = this.coreAuthService.getUserSessionData().perfil;
      this.userId = this.coreAuthService.getUserSessionData().idUsuario;
      this.projectsRequest();
      this.notificationsRequest();
      /*
      setTimeout(()=>{
        let calendarContainer: HTMLElement = document.querySelector('#calendar-container');
        this.calendarHeight = calendarContainer.offsetHeight;
        this.eventsList = [];
      },500);
      */
    // }

    /*this.webSocketService.connect();
    this.webSocketService.getNotifications().subscribe((notification) => {
      console.log("Noti->", notification)
      this.notifications.push(notification);
    });*/

  }

  /*sendNotification(): void {
    const notification = { message: 'Hello, this is a notification!' };
    this.webSocketService.sendNotification(notification);
  }*/

  async projectsRequest(){
    await this.dashboardService.getLastActiveProjects().subscribe((response) => {
      this.projects = response;
    });
  }

  async notificationsRequest(){
    await this.dashboardService.getLastNotifications().subscribe((response) => {
      this.notifications = response;
    });
  }

  eventsRequest(agendaListRequest: AgendaListRequest){
    agendaListRequest.owner = true;
    agendaListRequest.ownerId = this.userId;
    this.agendaService.getPageAgenda(agendaListRequest).subscribe((response: AgendaModel[]) => {
      this.eventsList = response;
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }
  postEventRequest(eventEmitted: any){
    this.agendaRequest.agenda = eventEmitted.agendaEvent;
    this.agendaRequest.userId = this.userId;
    this.agendaService.postAgenda(this.agendaRequest).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15,null,null,"Registro exitoso",5,false,null,null);
        this.eventsRequest(eventEmitted.reloadParams);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }
  putEventRequest(eventEmitted: any){
    this.agendaRequest.agenda = eventEmitted.agendaEvent;
    this.agendaRequest.userId = this.userId;
    this.agendaService.putAgenda(this.agendaRequest.agenda.id,this.agendaRequest).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15,null,null,"Actualización exitosa",5,false,null,null);
        this.eventsRequest(eventEmitted.reloadParams);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  deleteEventRequest(eventEmitted: any){
    this.agendaService.deleteAgenda(eventEmitted.agendaEvent.id).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15,null,null,"Borrado exitoso",5,false,null,null);
        this.eventsRequest(eventEmitted.reloadParams);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  // get existSesion() {
  //   return localStorage.getItem('session') ? true : false;
  // }

  openShowProjectModal(projectData: ProyectosModel) {
    const dialogRef = this.dialog.open(ShowProjectComponent, {
      width: '75%',
      data: projectData,
    });
  }

  openShowNotificationModal(notificationData: NotificacionModel) {
    const dialogRef = this.dialog.open(ShowNotificationComponent, {
      width: '50%',
      data: notificationData,
    }).afterClosed().subscribe(()=>{
      if(notificationData.leida === null){
        this.dashboardService.putReadNotification(notificationData.id).subscribe((resp) => {
          let originalIndex = this.repoNotifications.map((notification) => { return notification.id }).indexOf(resp.id);
          this.repoNotifications[originalIndex] = resp;
          this.showUnreadedFilter();
        })
      }
    });
  }

  showUnreadedFilter():void{
    this.notifications = JSON.parse(JSON.stringify(this.repoNotifications));
    if(!this.showUnreaded){
      let notifications_filter = this.notifications.filter(notification => { return (notification.leida==null); });
      this.notifications = notifications_filter;

    }
    else{
      let notifications_filter = this.notifications.filter(notification => { return (notification.leida); });
      this.notifications = notifications_filter;
    }
  }

  async marcarComoLeida(notificacion: any){
    await this.dashboardService.setAsReaded(notificacion).subscribe((response) => {
      this.notificationsRequest();
    });
    
  };

}
