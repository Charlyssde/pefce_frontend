import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MeetingsModel } from 'src/app/core/models/meetings/meetings-model';
import { MeetingCuentasModel } from 'src/app/core/models/meetings/meeting_cuentas-model';
import { FormMeetingsComponent } from 'src/app/features/meetings/components/form-meetings/form-meetings.component';
import { MeetingsService } from 'src/app/features/meetings/services/meetings.service';

@Component({
  selector: 'app-modal-create-meeting-panel-proyecto',
  templateUrl: './modal-create-meeting-panel-proyecto.component.html',
  styleUrls: ['./modal-create-meeting-panel-proyecto.component.css']
})
export class ModalCreateMeetingPanelProyectoComponent implements OnInit {

  zoomAccounts: MeetingCuentasModel[] = [];
  meetingModel: MeetingsModel = new MeetingsModel();
  meetingAccount: MeetingCuentasModel = null;
  @ViewChild(FormMeetingsComponent) meetingComponent: FormMeetingsComponent;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateMeetingPanelProyectoComponent>,
    private meetingsService: MeetingsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getMeetingsAcounts();
  }

  async getMeetingsAcounts(){
    await this.meetingsService.getAccountsBySelect().subscribe((response) => {
      this.zoomAccounts = response;
    });
  }

  async saveMeeting(){
    let today = new Date();
    this.meetingModel = this.meetingComponent.formulario.getRawValue();
    this.meetingModel.meetingZoom.start_time = "2023-03-31T16:22:34Z";//(this.meetingModel.meetingZoom.type == 1 ? today.toISOString() : new Date( this.meetingModel.meetingZoom.start_time ).toISOString() ).toString();
    this.meetingModel.activo = true;
    this.meetingModel.createdAt = today;
    this.meetingModel.updatedAt = null;
    this.meetingModel.meetingCuentaId = this.meetingAccount;
    this.meetingsService.createMeetingCuenta(this.meetingAccount.id,this.meetingModel).subscribe( (response) => {
      this.dialogRef.close(response);          
    });
    
  }


  closeModal(): void {
    this.dialogRef.close(null);
  }
}
