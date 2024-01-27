import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipoAgenda } from 'src/app/core/enums/tipo-agenda.enum';
import { AgendaModel } from 'src/app/core/models/agenda/agenda.model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { AgendaRequest } from 'src/app/core/utils/requests/agenda/Agenda.request';
import { AgendaService } from '../../services/agenda.service';
import 'add-to-calendar-button';
import { atcb_action } from "add-to-calendar-button";

export function minDateTimeValidator(minEndDatetime: string): ValidatorFn {
  return (control: FormControl): ValidationErrors | null => {
    if (minEndDatetime && control.value && control.value < minEndDatetime) {
      return { 'minDateTimeValidator': false, 'requiredValue': minEndDatetime }
    }
    return null;
  }
}

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {

  agendaEnum: TipoAgenda
  // Quill
  editorStyles = {};
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
    ]
  };

  //All day
  allDay: boolean = true;
  minEndDatetime: string;
  minDatetime: string;
  maxDatetime: string;

  formAgenda: FormGroup;
  edit: boolean;
  type: string;
  showDeleteOptions: boolean = false;
  agendaEvent: AgendaModel
  userId: number;
  agendaRequest: AgendaRequest = new AgendaRequest();

  @ViewChild('addCalendarButton') addCalendarButton: ElementRef;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgendaFormComponent>,
    private formBuilder: FormBuilder,
    private alerts: Alerts,
    private coreAuth: CoreAuthService,
    private agendaService: AgendaService
  ) {
    this.agendaEvent = data.agendaEvent;
    this.edit = data.edit;
    this.type = data.type;

  }

  ngOnInit() {
    this.userId = this.coreAuth.getUserSessionData().idUsuario;

    this.allDay = this.agendaEvent.diaCompleto;
    this.minDatetime = this.agendaEvent.inicio.toISOString().slice(0, 10) + 'T00:00:00';
    this.minEndDatetime = this.agendaEvent.inicio.toISOString().slice(0, 10) + 'T00:00:00';
    this.maxDatetime = this.agendaEvent.inicio.toISOString().slice(0, 10) + 'T23:59:00';

    this.formAgenda = this.formBuilder.group({
      id: [null],
      titulo: [null],
      descripcion: [null],
      inicio: [{ value: null, disabled: this.allDay }, [Validators.required]],
      fin: [{ value: null, disabled: this.allDay }, [Validators.required, minDateTimeValidator(this.minEndDatetime)]],
      diaCompleto: [null],
      tipoEvento: [null, [Validators.required]],
      estatus: [true, [Validators.required]],
      createdAt: [null],
      updatedAt: [null],
      usuariosAgenda: [[]]
    });

    if (this.edit) {
      this.formAgenda.setValue(this.agendaEvent);
    }
    this.formAgenda.patchValue([this.agendaEvent]);
    this.formAgenda.controls['diaCompleto'].patchValue(this.agendaEvent.diaCompleto);
    this.formAgenda.controls['tipoEvento'].patchValue(this.agendaEvent.tipoEvento);
    if (this.allDay) {
      this.formAgenda.controls['inicio'].patchValue(this.agendaEvent.inicio.toISOString().slice(0, 10) + 'T00:00:00');
      this.formAgenda.controls['fin'].patchValue(this.agendaEvent.inicio.toISOString().slice(0, 10) + 'T23:59:00');
      this.formAgenda.get('fin').disable();
      this.formAgenda.get('inicio').disable();
    }
    else {
      this.formAgenda.controls['inicio'].patchValue(this.edit ? new Date(this.agendaEvent.inicio).toISOString().slice(0, 16) : (this.type==='timeGridWeek' ? new Date(this.agendaEvent.inicio).toISOString().slice(0, 16) : null));
      this.formAgenda.controls['fin'].patchValue(this.edit ? new Date(this.agendaEvent.fin).toISOString().slice(0, 16) : (this.type==='timeGridWeek' ? new Date(this.agendaEvent.fin).toISOString().slice(0, 16) : null));
      this.formAgenda.get('inicio').enable();
      this.formAgenda.get('fin').enable();
    }
  }

  onChangeAllDay(): void {
    this.allDay = this.formAgenda.controls['diaCompleto'].value;
    if (this.allDay) {
      this.formAgenda.controls['inicio'].patchValue(this.agendaEvent.inicio.toISOString().slice(0, 10) + 'T00:00:00');
      this.formAgenda.controls['fin'].patchValue(this.agendaEvent.inicio.toISOString().slice(0, 10) + 'T23:59:00');
      this.formAgenda.get('fin').disable();
      this.formAgenda.get('inicio').disable();
    }
    else {
      this.formAgenda.controls['inicio'].patchValue(null);
      this.formAgenda.controls['fin'].patchValue(null);
      this.formAgenda.get('inicio').enable();
      this.formAgenda.get('fin').enable();
    }
    this.formAgenda.get('fin').updateValueAndValidity();
  }

  onChangeMinDatetime() {
    this.minEndDatetime = (this.allDay) ? this.agendaEvent.inicio.toISOString().slice(0, 10) + 'T00:00:00' : this.minEndDatetime = this.formAgenda.get('inicio').value + ':00';
    this.formAgenda.get('fin').setValidators([Validators.required, minDateTimeValidator(this.minEndDatetime)]);
    this.formAgenda.get('fin').updateValueAndValidity();
  }


  onSubmitForm() {
    if (this.formAgenda.valid) {
      let
        agenda: AgendaModel = this.formAgenda.getRawValue();
      agenda.inicio = new Date(agenda.inicio);
      agenda.fin = new Date(agenda.fin);
      agenda.estatus = true;
      agenda.createdAt = this.edit ? this.agendaEvent.createdAt : new Date();
      agenda.updatedAt = this.edit ? new Date() : null;

      if (this.edit) {
        this.updateEvent(agenda);
      }
      else {
        this.createEvent(agenda);
      }
    }
    else {
      this.alerts.printSnackbar(15, null, null, "El formulario debe ser completado", 5, false, null, null);
    }
  }

  createEvent(agendaEvent: AgendaModel): void {
    this.dialogRef.close({
      result:true,
      edit:false,
      delete:false,
      agendaEvent:agendaEvent
    });
  }
  updateEvent(agendaEvent: AgendaModel): void {
    this.dialogRef.close({
      result:true,
      edit:true,
      delete:false,
      agendaEvent:agendaEvent
    });
  }
  deleteAgendaEvent(): void {
    this.dialogRef.close({
      result:true,
      edit:true,
      delete:true,
      agendaEvent:this.agendaEvent
    });
  }

  getDate(date: Date) : string{
    return date.toString().split('T')[0];
  }
  getTime(date: Date): string{
    return date.toString().split('T')[1];
  }

  addToCalendarButton():void {
    let config:Object = {
      name: this.formAgenda.controls['tipoEvento'].value + ' - ' + this.formAgenda.controls['titulo'].value,
      description: this.formAgenda.controls['descripcion'].value,
      options: ['Apple','Google','iCal','Microsoft365','MicrosoftTeams','Outlook.com'],
      location:"SEDECOP",
      startDate: this.getDate(this.formAgenda.controls['inicio'].value),
      endDate: this.getDate(this.formAgenda.controls['fin'].value), 
      startTime:this.getTime(this.formAgenda.controls['inicio'].value) ,
      endTime:this.getTime(this.formAgenda.controls['fin'].value),
      timeZone:"America/Mexico_City",
      lightMode:'bodyScheme',
      language:'es'
    };

    let button = this.addCalendarButton.nativeElement;
    atcb_action(config,button);
  }

}
