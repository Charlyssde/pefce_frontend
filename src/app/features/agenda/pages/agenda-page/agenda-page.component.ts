import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { AgendaModel } from 'src/app/core/models/agenda/agenda.model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { AgendaRequest } from 'src/app/core/utils/requests/agenda/Agenda.request';
import { AgendaListRequest } from 'src/app/core/utils/requests/agenda/AgendaList.request';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  styleUrls: ['./agenda-page.component.css']
})
export class AgendaPageComponent implements OnInit {
  helpsSettings: any = {
    'module_name': 'Agenda',
    'description': 'Módulo encargado de gestionar la agenda de un usuario. Permite visualizar los eventos agendados de tipo personal, meetings, tareas, eventos y capacitaciones',
    'details': [
      { 'detail': 'Clic en una fecha/día/hora', 'description': 'Muestra un formulario para agendar un evento personal.' },
      { 'detail': 'Clic en un evento', 'description': 'Muestra un formulario para editar un evento personal, mismo que contiene la funcionalidad de eliminar el evento seleccionado.' },
      { 'detail': 'Clic en "Agregar a mi calendario personal"', 'description': 'Muestra una lista de opciones para sincronizar un evento con el calendario personal.' },
      { 'detail': 'Arrastrar y soltar un evento (Vista "Mes")', 'description': 'Actualiza la fecha/hora de inicio de un evento.' },
      { 'detail': 'Arrastrar y soltar fin de evento (Vista "Semana")', 'description': 'Actualiza la hora de cierre de un evento en la vista por semana.' }, 
    ]
  };
  
  calendarHeight: number = 1;
  eventsList: AgendaModel[] = [];

  agendaListRequest: AgendaListRequest = new AgendaListRequest();
  agendaRequest: AgendaRequest = new AgendaRequest();
  activeProfile: any;
  userId: number;
  
  constructor(
    private bottomSheet: MatBottomSheet,
    private alerts: Alerts,
    private coreAuthService: CoreAuthService,
    private agendaService: AgendaService
  ) { }

  ngOnInit() {
    this.activeProfile = this.coreAuthService.getUserSessionData().perfil;
    this.userId = this.coreAuthService.getUserSessionData().idUsuario;
    setTimeout(()=>{
      let calendarContainer: HTMLElement = document.querySelector('#calendar-container');
      this.calendarHeight = calendarContainer.offsetHeight;
      this.eventsList = [];
    },500);
  }

  emitUserId(userId: number){
    this.userId = userId;
    this.agendaListRequest.ownerId = userId;
    this.agendaListRequest.owner = true;
    this.eventsRequest(this.agendaListRequest);
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  eventsRequest(agendaListRequest: AgendaListRequest){
    this.agendaListRequest = agendaListRequest;
    this.agendaListRequest.ownerId = this.userId;
    this.agendaListRequest.owner = this.userId ? true : false;
    this.agendaService.getPageAgenda(this.agendaListRequest).subscribe((response: AgendaModel[]) => {
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

  
}
