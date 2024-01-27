import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { MatDialog } from '@angular/material';
import { Alerts } from 'src/app/core/utils/alerts';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { AgendaListRequest } from 'src/app/core/utils/requests/agenda/AgendaList.request';
import { AgendaModel } from 'src/app/core/models/agenda/agenda.model';
import { AgendaFormComponent } from '../agenda-form/agenda-form.component';
import { AgendaRequest } from 'src/app/core/utils/requests/agenda/Agenda.request';
import { Output } from '@angular/core';

@Component({
  selector: 'app-agenda-calendar',
  templateUrl: './agenda-calendar.component.html',
  styleUrls: ['./agenda-calendar.component.css']
})
export class AgendaCalendarComponent implements OnChanges {
  @Input() calendarHeight: number = 0;
  @Input() eventsList: AgendaModel[] = [];
  @Output() eventsRequest = new EventEmitter<AgendaListRequest>();
  @Output() postEventRequest = new EventEmitter<any>();
  @Output() putEventRequest = new EventEmitter<any>();
  @Output() deleteEventRequest = new EventEmitter<any>();

  // Calendar settings
  plugins = [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin];
  header = {
    left: 'title',
    center: '',
    right: 'dayGridMonth,dayGridDay,timeGridWeek,listWeek today prev,next',
  };
  allDayText = "Todo el día";
  buttonText = {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    list: 'Lista'
  };
  titleFormat = {
    year: 'numeric', month: 'long', day: 'numeric'
  };
  locales: [{ code: esLocale }];
  locale = 'es';
  defaultDate = new Date();
  height = 200;
  eventStartEditable = true;
  events = [];

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  agendaListRequest: AgendaListRequest = new AgendaListRequest();

  constructor(
    private alerts: Alerts,
    private dialog: MatDialog,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.calendarHeight && changes.calendarHeight.currentValue) {
      this.height = this.calendarHeight
    }
    if (changes.eventsList && changes.eventsList.currentValue) {
      this.getEvents();
    }
  }

  datesRender(info: any) {
    this.agendaListRequest.startDate = info.view.activeStart;
    this.agendaListRequest.endDate = info.view.activeEnd;
    this.agendaListRequest.owner = false;
    this.agendaListRequest.ownerId = null;
    this.eventsRequest.emit(this.agendaListRequest);
  }

  getEvents() {
    this.events = [];
    for (let agenda of this.eventsList) {
      let endDate = null
      if (agenda.diaCompleto) {
        endDate = new Date(agenda.fin);
        endDate.setTime(endDate.getTime() + 24 * 60 * 60 * 1000);
      } else {
        endDate = agenda.fin;
      }
      this.events.push({
        title: agenda.tipoEvento + '-' + agenda.titulo,
        start: agenda.inicio,
        end: endDate,
        allDay: agenda.diaCompleto,
        editable: true,
        eventDurationEditable: true,
        extendedProps: { originalObject: agenda },
        className: ['mainEvent', this.setColorClass(agenda)]
      });
    }
  }
  setColorClass(agenda: any): string {
    let
      today = new Date().getTime(),
      startDate = new Date(agenda.inicio).getTime(),
      difference = (startDate - today),
      days = Math.round(difference / (1000 * 60 * 60 * 24)),
      minutes = Math.round(difference / (1000 * 60)),
      className = "";

    switch (true) {
      case (days > 14): className = "inTimeEvent"; break;
      case ((days > 7 && days <= 14)): className = "warningEvent"; break;
      case ((days > 0 || minutes > 0) && days <= 7): className = "dangerEvent"; break;
      case (days <= 0 && minutes > -1440): className = "todayEvent"; break;
      case (days < -1 && minutes < 0): className = "oldEvent"; break;
      default: break;
    }
    return className;
  }

  openFormModal(agendaEvent: AgendaModel, edit: boolean, type) {
    this.dialog.open(AgendaFormComponent, {
      width: '80vw',
      data: { agendaEvent: agendaEvent, edit: edit, type: type }
    }).afterClosed().subscribe((response) => {
      if (response && response.result == true) {
        setTimeout(()=>{
          if (response.edit) {
            if(response.delete){
              this.deleteEventRequest.emit({ agendaEvent: response.agendaEvent, reloadParams: this.agendaListRequest });
            }
            else{
              this.putEventRequest.emit({ agendaEvent: response.agendaEvent, reloadParams: this.agendaListRequest });
            }
          }
          else {
            this.postEventRequest.emit({ agendaEvent: response.agendaEvent, reloadParams: this.agendaListRequest });
          }
        },200);
      }
    });
  }


  dateClick(info) {
    let
      type: string = info.view.type,
      today: string = new Date().toLocaleDateString('fr-CA'),
      calendarDate: string = info.date.toLocaleDateString('fr-CA'),
      allDay: boolean = info.allDay,
      agendaEvent: AgendaModel = new AgendaModel();
    if (today >= calendarDate) {
      this.alerts.printSnackbar(15, null, null, "Solo puedes crear eventos posteriores al día de hoy", 5, false, null, null);
      return false;
    }
    agendaEvent.diaCompleto = allDay;
    agendaEvent.estatus = true;
    if(type === 'dayGridMonth'){ 
      agendaEvent.inicio = new Date(calendarDate + 'T00:00:00Z'); 
      agendaEvent.fin = new Date(calendarDate);
    }
    if(type === 'timeGridWeek'){ 
      agendaEvent.inicio = new Date(info.date.getTime()-(new Date().getTimezoneOffset()*60000));
      agendaEvent.fin = new Date(agendaEvent.inicio.getTime()+(1000*60*30));
    }
    agendaEvent.tipoEvento = "PERSONAL";
    this.openFormModal(agendaEvent, false, type);
  }

  eventClick(info) {
    let
      type: string = info.view.type,
      agendaEvent: AgendaModel = info.event.extendedProps.originalObject,
      agendaTime = new Date((new Date(agendaEvent.inicio).setUTCHours(0, 0, 0, 0))).toISOString().slice(0, 19),
      todayEndDayTime = new Date().toLocaleDateString('fr-CA') + 'T23:59:00';

    if (agendaEvent.tipoEvento !== "PERSONAL") {
      this.alerts.printSnackbar(15, null, null, "Este tipo de evento no puede ser desplazado, solo se permiten los eventos de tipo PERSONAL", 5, false, null, null)
      return;
    }
    if (agendaEvent.tipoEvento === "PERSONAL" && agendaTime < todayEndDayTime) {
      this.alerts.printSnackbar(15, null, null, "Este evento no puede ser editado", 5, false, null, null)
      return;
    }
    agendaEvent.inicio = new Date(new Date(agendaEvent.inicio).toISOString().slice(0, 16));
    agendaEvent.fin = new Date(new Date(agendaEvent.fin).toISOString().slice(0, 16));
    this.openFormModal(agendaEvent, true,type);
  }

  eventDrop(info) {
    let
      agendaEvent: AgendaModel = info.event.extendedProps.originalObject,
      agendaOldTime = new Date((new Date(info.oldEvent.start).setUTCHours(0, 0, 0, 0))).toISOString().slice(0, 19),
      agendaTime = new Date((new Date(info.event.start).setUTCHours(0, 0, 0, 0))).toISOString().slice(0, 19),
      todayEndDayTime = new Date().toLocaleDateString('fr-CA') + 'T23:59:00',
      todayStartDayTime = new Date().toLocaleDateString('fr-CA') + 'T00:00:00';

    if (agendaEvent.tipoEvento !== "PERSONAL") {
      info.revert();
      this.alerts.printSnackbar(15, null, null, "Este tipo de evento no puede ser desplazado, solo se permiten los eventos de tipo PERSONAL", 5, false, null, null)
      return;
    }
    if (agendaEvent.tipoEvento === "PERSONAL" && agendaOldTime < todayStartDayTime) {
      info.revert();
      this.alerts.printSnackbar(15, null, null, "Este evento no puede ser desplazado porque ya caducó", 5,false, null, null)
      return;
    }
    if (agendaEvent.tipoEvento === "PERSONAL" && agendaTime < todayEndDayTime) {
      info.revert();
      this.alerts.printSnackbar(15, null, null, "Este evento no puede ser desplazado a una fecha anterior o igual a la del día de hoy", 5, false, null, null)
      return false;
    }
    agendaEvent.inicio = info.event.start;
    agendaEvent.fin = (agendaEvent.diaCompleto) ? new Date(info.event.start.toLocaleDateString('fr-CA') + 'T23:59:00') : info.event.end;
    setTimeout(()=>{
      this.putEventRequest.emit({ agendaEvent: agendaEvent, reloadParams: this.agendaListRequest });
    },200);
  }
  eventResize(info) {
      let
        agendaEvent: AgendaModel = info.event.extendedProps.originalObject,
        dateStart = info.event.start,
        dateEnd = info.event.end;
      agendaEvent.inicio = dateStart;
      agendaEvent.fin = dateEnd
      setTimeout(()=>{
        this.putEventRequest.emit({ agendaEvent: agendaEvent, reloadParams: this.agendaListRequest });
      },200);
  }
}
