import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { MeetingsModel } from 'src/app/core/models/meetings/meetings-model';
import { FormMeetingsComponent } from '../../components/form-meetings/form-meetings.component';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-meetings-update',
  templateUrl: './meetings-update.component.html',
  styleUrls: ['./meetings-update.component.css']
})
export class MeetingsUpdateComponent implements OnInit {
  idCuentaMeeting: number;
  idMeeting: number;

  meetingModel: MeetingsModel = new MeetingsModel();
  @ViewChild(FormMeetingsComponent) meetingComponent: FormMeetingsComponent;

  constructor(
    public activatedRouter:ActivatedRoute,
    public lib: ScriptsGlobalService,
    private meetingsService: MeetingsService
  ) { }

  ngOnInit() {
    this.idCuentaMeeting = parseInt(this.activatedRouter.snapshot.paramMap.get('idCuentaMeeting'));
    this.idMeeting = parseInt(this.activatedRouter.snapshot.paramMap.get('idMeeting'));
  }

  async save(){
    let today = new Date();
    this.meetingModel = this.meetingComponent.formulario.getRawValue();
    this.meetingModel.meetingZoom.start_time = (this.meetingModel.meetingZoom.type == 1 ? today.toISOString() : new Date(this.meetingModel.meetingZoom.start_time).toISOString).toString();
    this.meetingModel.id = this.meetingComponent.meeting.id;
    this.meetingModel.apiResponse = this.meetingComponent.meeting.apiResponse;
    this.meetingModel.activo = this.meetingComponent.meeting.activo;
    this.meetingModel.createdAt = this.meetingComponent.meeting.createdAt;
    this.meetingModel.updatedAt = today;
    this.meetingModel.meetingCuentaId = this.meetingComponent.cuentaMeeting;

  if(this.meetingComponent.validForm()){
      this.meetingsService.updateMeetingCuenta(this.idCuentaMeeting,this.idMeeting,this.meetingModel).subscribe( (response) => {
        this.lib.printSnackbar(13,1,'meeting de zoom',null,5,true,'meetings/cuentas/'+this.idCuentaMeeting+'/zoom',null);
      }, (error) => {
        this.lib.printErrorSnackBar(error);
      });
    }
    else{
      this.lib.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }
  }

}
