import { Component, OnInit } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  showPage = true;
  showCreate = false;
  showUpdate = false;
  showEventosEmpresas = false;
  idForm: number = 0;

  constructor(
    public scriptGL: ScriptsGlobalService
  ) { }

  eTipoEvento = [
    { key: 1, value:'Solicitud de producto o servicio' },
    { key: 2, value:'Oferta exportable' },
    { key: 3, value:'Evento' },
  ];
  eTipoSolicitud = [
    { key: 1, value:'Asesoría | Acompañamiento' },
    { key: 2, value:'Compra de producto o servicio' },
    { key: 3, value:'Oferta exportable' },
  ];

  eEstatus = [
    { key: 1, value: 'En espera' },
    { key: 2, value: 'En revisión' },
    { key: 3, value: 'Aceptado' },
    { key: 4, value: 'Rechazado' },
    { key: 5, value: 'Iniciado' },
    { key: 6, value: 'Finalizado' }
  ];

  ngOnInit() {
    
  }

  goToCreate() {
    this.showPage = false;
    this.showUpdate = false;
    this.showCreate = true;
    this.showEventosEmpresas = false;
  }

  goToPage() {
    this.showCreate = false;
    this.showUpdate = false;
    this.showPage = true;
    this.showEventosEmpresas = false;
  }

  goToUpdate(event) {
    if (event) {
      this.showCreate = false;
      this.showPage = false;
      this.showUpdate = true;
      this.showEventosEmpresas = false;
      this.idForm = event.id;
    }
  }

  goToEventosEmpresas(event){
    if(event){
      this.showCreate = false;
      this.showPage = false;
      this.showUpdate = false;
      this.showEventosEmpresas = true;
      this.idForm = event.id;
    }
  }
}
