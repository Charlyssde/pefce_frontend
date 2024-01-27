import { MeetingsService } from './../../services/meetings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { MeetingCuentasModel } from 'src/app/core/models/meetings/meeting_cuentas-model';
import { FormMeetingsCuentaComponent } from '../../components/form-meetings-cuenta/form-meetings-cuenta.component';

@Component({
  selector: 'app-meetings-administrador-update',
  templateUrl: './meetings-administrador-update.component.html',
  styleUrls: ['./meetings-administrador-update.component.css']
})
export class MeetingsAdministradorUpdateComponent implements OnInit {

  idCuentaMeeting: number;
  cuentaMeeting: MeetingCuentasModel = new MeetingCuentasModel();
  @ViewChild(FormMeetingsCuentaComponent) formulario: FormMeetingsCuentaComponent;

  constructor(
    public activatedRouter:ActivatedRoute,
    public lib: ScriptsGlobalService,
    private meetingsService: MeetingsService
  ) { }

  ngOnInit() {
    this.idCuentaMeeting = parseInt(this.activatedRouter.snapshot.paramMap.get('idCuentaMeeting'));
  }

  async save(){
    if(this.formulario.validForm()){
      let today = new Date();
      this.cuentaMeeting = this.formulario.formulario.getRawValue();
      this.cuentaMeeting.updatedAt = today;

      await this.meetingsService.createCuentas(this.cuentaMeeting).subscribe(cuentaMeeting => {
        this.lib.printSnackbar(13,2,'cuenta de meeting',null,5,true,'meetings/cuentas',null);
      }, (error) => {
        this.lib.printErrorSnackBar(error);
      });

    }
    else{
      this.lib.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }
  }

}
