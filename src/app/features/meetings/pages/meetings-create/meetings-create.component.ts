import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { MeetingsService } from './../../services/meetings.service';
import { MeetingsModel } from './../../../../core/models/meetings/meetings-model';
import { FormMeetingsComponent } from './../../components/form-meetings/form-meetings.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-meetings-create',
  templateUrl: './meetings-create.component.html',
  styleUrls: ['./meetings-create.component.css']
})
export class MeetingsCreateComponent implements OnInit {
  idCuentaMeeting: number;
  idMeeting: number;

  constructor(
    public activatedRouter: ActivatedRoute,
    public lib: ScriptsGlobalService,
    private meetingsService: MeetingsService,
    private utils: Utils
  ) { }

  meetingModel: MeetingsModel = new MeetingsModel();
  @ViewChild(FormMeetingsComponent) meetingComponent: FormMeetingsComponent;

  ngOnInit() {
    this.idCuentaMeeting = parseInt(this.activatedRouter.snapshot.paramMap.get('idCuentaMeeting'));
    this.idMeeting = 0;
  }

  async save() {
    let today = new Date();
    this.meetingModel = this.meetingComponent.formulario.getRawValue();
    console.log( this.meetingModel.meetingZoom.start_time );
    this.meetingModel.meetingZoom.start_time = (this.meetingModel.meetingZoom.type == 1 ? today.toISOString() : this.utils.parseDateToYYYYMMDDHHiiss_ISO8601(new Date(this.meetingModel.meetingZoom.start_time)).replace(' ', 'T') );
    //this.meetingModel.meetingZoom.start_time = (this.meetingModel.meetingZoom.type == 1 ? today.toISOString() : new Date(this.meetingModel.meetingZoom.start_time).toISOString() ).toString();
    
    this.meetingModel.activo = true;
    this.meetingModel.createdAt = today;
    this.meetingModel.updatedAt = null;
    console.log( this.meetingModel );
    this.meetingModel.meetingCuentaId = this.meetingComponent.cuentaMeeting;

    if (this.meetingComponent.validForm()) {
      this.meetingsService.createMeetingCuenta(this.idCuentaMeeting, this.meetingModel).subscribe((response) => {
        this.lib.printSnackbar(12, 1, 'meeting de zoom', null, 5, true, 'meetings/cuentas/' + this.idCuentaMeeting + '/zoom', null);
      }, (error) => {
        this.lib.printErrorSnackBar(error);
      });
    }
    else {
      this.lib.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }
  }

}
