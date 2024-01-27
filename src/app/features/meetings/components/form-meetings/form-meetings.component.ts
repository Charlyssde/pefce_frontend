import { DaysList } from '../../../../core/constants/days-list';
import { ZoomMeetingSettingsModel } from './../../../../core/models/meetings/zoom_meeting_seetings-model';
import { ZoomMeetingRecurrence } from './../../../../core/models/meetings/zoom_meeting_recurrence-model';
import { ZoomMeetingModel } from './../../../../core/models/meetings/zoom_meeting-model';
import { MeetingsModel } from './../../../../core/models/meetings/meetings-model';
import { MeetingCuentasModel } from '../../../../core/models/meetings/meeting_cuentas-model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { MeetingsService } from '../../services/meetings.service';
import { ZoomMeetingTypes } from 'src/app/core/constants/zoom-meeting-types';
import { Utils } from 'src/app/core/utils/utils';
import { ZoomMeetingRecurrenceTypes } from 'src/app/core/constants/zoom-meeting-recurence-types';

@Component({
  selector: 'app-form-meetings',
  templateUrl: './form-meetings.component.html',
  styleUrls: ['./form-meetings.component.css']
})
export class FormMeetingsComponent implements OnInit {

  formulario: any;
  formularioZoom: any;
  formularioZoomRecurrence: any;
  formularioZoomSettings: any;

  tiposMeeting: any = new ZoomMeetingTypes().dataset;
  tipoRecurrenciaMeeting: any = new ZoomMeetingRecurrenceTypes().dataset;
  daysList: any = new DaysList().dataset;
  dayCheckboxList: any = [
    { key: 1, value: "Domingo", checked: false },
    { key: 2, value: "Lunes", checked: false },
    { key: 3, value: "Martes", checked: false },
    { key: 4, value: "Miércoles", checked: false },
    { key: 5, value: "Jueves", checked: false },
    { key: 6, value: "Viernes", checked: false },
    { key: 7, value: "Sábado", checked: false }
  ];

  cuentaMeeting: MeetingCuentasModel = new MeetingCuentasModel();
  @Input() idCuentaMeeting: number;
  meeting: MeetingsModel = new MeetingsModel();
  @Input() idMeeting: number;

  zoomMeeting: ZoomMeetingModel = new ZoomMeetingModel();
  zoomMeetingRecurrence: ZoomMeetingRecurrence = new ZoomMeetingRecurrence();
  zoomMeetingSettings: ZoomMeetingSettingsModel = new ZoomMeetingSettingsModel();
  /*********************************************/
  // Visual elements, events, validations
  /*********************************************/
  // Zoom meeting basic data interactions and validations
  showZoomMeetingStartTime: boolean = false;
  startTime: string = null;
  minDate: string = this.utils.parseDateToYYYYMMDDHHiiss_ISO8601(new Date()).replace(' ', 'T');
  showZoomMeetingDuration: boolean = false;
  // Zoom meeting rrecurrence interactions and validations
  showZoomMeetingRecurrenceForm: boolean = false;
  recurrenceTypeMode = "";
  monthlyRecurrencyMode: string = null;
  showRecurrenceTypeSettings = false;
  showMonthlyRecurrenceTypeSettings = false;
  showWeeklyRecurrenceTypeSettings = false;
  endRecurrenceMode: string = null;
  endDateTime: string = null;
  maxRepeatInterval: number = 90;

  constructor(
    // public appC: AppComponent,
    public lib: ScriptsGlobalService,
    private meetingsService: MeetingsService,
    public formBuilder: FormBuilder,
    private utils: Utils
  ) {
    // this.appC.cargandoTexto = "Cargando";
  }

  ngOnInit() {
    // this.appC.cargandoTexto = "Cargando";
    this.prepareBaseFormRequest();
    this.meetingGetFormRequiredData();
  }

  /*********************************************/
  // Zoom meeting base functions
  /*********************************************/
  zoomMeetingTypeChange(zoomMeetingType: number): void {
    this.endRecurrenceMode = null;
    this.endDateTime = null;
    this.showZoomMeetingStartTime = (zoomMeetingType !== 1);
    this.showZoomMeetingDuration = (zoomMeetingType === 2);
    this.showZoomMeetingRecurrenceForm = ([3, 6, 8, 9].indexOf(zoomMeetingType) > -1);

    this.formulario.get('meetingZoom').controls['duration'].patchValue(zoomMeetingType === 2 ? 60 : 0);
    this.formulario.get('meetingZoom').controls['pre_schedule'].patchValue(false);
    this.formulario.get('meetingZoom').controls['schedule_for'].value = (null);
    this.formulario.get('meetingZoom').controls['recurrence'].value = (null);
    this.formulario.get('meetingZoom').controls['start_time'].value = (null);

    this.startTime = null;
    
    // Recurrence meeting
    if ([3, 6, 8, 9].indexOf(zoomMeetingType) > -1) {
      this.formularioZoomRecurrence.patchValue(this.zoomMeetingRecurrence);
      this.formulario.get('meetingZoom').controls['recurrence'] = this.formularioZoomRecurrence;
    }

    // Set schedule_for
    if ([1, 2, 3, 8].indexOf(zoomMeetingType) > -1) {
      this.formulario.get('meetingZoom').controls['schedule_for'].value = (this.cuentaMeeting.zoomUserId);
    }

    // Set start_time
    if (zoomMeetingType === 1) {
      let nowTime = new Date();
      this.formulario.get('meetingZoom').controls['start_time'].value = nowTime;
      this.startTime = this.utils.parseDateToDatetimeLocale(nowTime);
    }
  }

  startTimeChange(startDate: string) {
    if (startDate) {
      startDate = startDate.replace('T', ' ') + ":00";
      let dateSetted = this.utils.parseYYYYMMDDHHiiss_ISO8601ToDate(startDate);
      this.formulario.get('meetingZoom').get('start_time').value = dateSetted;
    }
  }

  /*********************************************/
  // Recurrence functions
  /*********************************************/
  zoomMeetingRecurrenceTypeChange(zoomMeetingRecurrenceType: number): void {
    this.showRecurrenceTypeSettings = false;
    this.showMonthlyRecurrenceTypeSettings = false;
    this.showWeeklyRecurrenceTypeSettings = false;
    if (zoomMeetingRecurrenceType) {
      // Prepare monthly interaction
      if (zoomMeetingRecurrenceType === 3) {
        this.recurrenceTypeMode = 'Mensual';
        this.maxRepeatInterval = 3;
        this.showRecurrenceTypeSettings = true;
        this.showMonthlyRecurrenceTypeSettings = true;
      }
      // Prepare weekly interaction
      else if (zoomMeetingRecurrenceType === 2) {
        this.maxRepeatInterval = 12;
        this.recurrenceTypeMode = 'Semanal';
        this.showRecurrenceTypeSettings = true;
        this.showWeeklyRecurrenceTypeSettings = true;
      }
      // Prepare daily interaction
      else if (zoomMeetingRecurrenceType === 1) {
        this.maxRepeatInterval = 90;
        this.recurrenceTypeMode = 'Diario';
      }
    }
  }
  endDateTimeChange(endDateTime: string) {
    if (endDateTime) {
      endDateTime = endDateTime.replace('T', ' ') + ":00";
      let dateSetted = this.utils.parseYYYYMMDDHHiiss_ISO8601ToDate(endDateTime);
      this.formulario.get('meetingZoom').get('recurrence').get('end_date_time').value = dateSetted;
    }
  }
  monthlyRecurrencyModeChange(monthlyRecurrencyMode: string):void {
    this.formulario.get('meetingZoom').get('recurrence').get('monthly_day').value = null;
    this.formulario.get('meetingZoom').get('recurrence').get('monthly_week').value = null;
    this.formulario.get('meetingZoom').get('recurrence').get('monthly_week_day').value = null;
  }
  endRecurrenceModeChange(endRecurrenceMode: string):void {
    this.formulario.get('meetingZoom').get('recurrence').get('end_times').value = null;
    this.formulario.get('meetingZoom').get('recurrence').get('end_date_time').value = null;
  }
  dayCheckboxListChange() {
    let weeklyDaysArray = [];
    for (let day of this.dayCheckboxList) {
      if (day.checked) { weeklyDaysArray.push(day.key); }
    }
    this.formulario.get('meetingZoom').get('recurrence').get('weekly_days').value = ((weeklyDaysArray.length > 0) ? weeklyDaysArray.join() : null);
  }


  /*********************************************/
  // Prepare forms
  /*********************************************/
  prepareBaseFormRequest(): void {
    this.formularioZoomRecurrence = this.formBuilder.group({
      end_date_time: [null],
      end_times: [null],
      monthly_day: [null],
      monthly_week: [null],
      monthly_week_day: [null],
      repeat_interval: [null],
      type: [null],
      weekly_days: [null],
    });
    this.formularioZoomRecurrence.patchValue(this.zoomMeetingRecurrence);

    this.formularioZoomSettings = this.formBuilder.group({
      allow_multiple_devices: [null],
      approval_type: [null],
      auto_recording: [null],
      jbh_time: [null],
      join_before_host: [null],
      mute_upon_entry: [null],
      participant_video: [null],
      registration_type: [null],
      waiting_room: [null],
    });
    this.formularioZoomSettings.patchValue(this.zoomMeetingSettings);

    this.formularioZoom = this.formBuilder.group({
      agenda: [null, Validators.required],
      type: [null, Validators.required],
      default_password: [false],
      duration: [60],
      password: [null],
      pre_schedule: [null],
      recurrence: this.formularioZoomRecurrence,
      schedule_for: [null],
      settings: this.formularioZoomSettings,
      start_time: [null],
      timezone: ["America/Mexico_City", Validators.required],
      topic: [null, Validators.required]
    });
    this.formularioZoom.patchValue(this.zoomMeeting);

    this.formulario = this.formBuilder.group({
      id: [null],
      meetingCuentaId: [this.cuentaMeeting, Validators.required],
      apiResponse: [null],
      activo: [true],
      createdAt: [null],
      updatedAt: [null],
      meetingZoom: this.formularioZoom,
    });
  }


  /*********************************************/
  // Form validations
  /*********************************************/
  validForm() {
    return this.formulario.valid;
  }

  /*********************************************/
  // Backend requests
  /*********************************************/
  async meetingGetFormRequiredData() {
    if(this.idCuentaMeeting){
      console.log( this.idMeeting );
      await this.meetingsService.meetingGetFormRequiredData(this.idCuentaMeeting, this.idMeeting).subscribe((response) => {
        if (response) {
          this.cuentaMeeting = response.cuentaMeeting;
          if (this.idMeeting !== 0) {
            this.zoomMeetingTypeChange(response.meeting.meetingZoom.type);
  
            this.meeting = response.meeting;
            this.zoomMeetingSettings = this.zoomMeeting.settings;
            this.zoomMeetingRecurrence = this.zoomMeeting.recurrence;
            this.zoomMeeting = this.meeting.meetingZoom;
            this.prepareBaseFormRequest();
            console.log( this.meeting.meetingZoom.start_time );
            this.startTime = this.utils.parseDateToYYYYMMDDHHiiss_ISO8601(new Date(this.meeting.meetingZoom.start_time)).replace(' ', 'T');
            console.log( this.startTime );
          }
        }
      }, (error) => {
  
      });
    }
  }

}
