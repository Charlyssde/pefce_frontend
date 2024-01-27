import { MeetingsService } from './../../services/meetings.service';
import { FormMeetingsCuentaComponent } from './../../components/form-meetings-cuenta/form-meetings-cuenta.component';
import { MeetingCuentasModel } from './../../../../core/models/meetings/meeting_cuentas-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

@Component({
  selector: 'app-meetings-administrador-create',
  templateUrl: './meetings-administrador-create.component.html',
  styleUrls: ['./meetings-administrador-create.component.css']
})
export class MeetingsAdministradorCreateComponent implements OnInit {

  cuentaMeeting: MeetingCuentasModel = new MeetingCuentasModel();
  @ViewChild(FormMeetingsCuentaComponent) formulario: FormMeetingsCuentaComponent;


  constructor(
    private meetingsService: MeetingsService,
    private lib: ScriptsGlobalService
  ) { }

  ngOnInit() {
  }

  async save(){
    if(this.formulario.validForm()){
      let today = new Date();
      this.cuentaMeeting = this.formulario.formulario.getRawValue();
      this.cuentaMeeting.activo = true;
      this.cuentaMeeting.createdAt = today;
      this.cuentaMeeting.updatedAt = null;

      await this.meetingsService.createCuentas(this.cuentaMeeting).subscribe(cuentaMeeting => {
        this.lib.printSnackbar(12,2,'cuenta de meeting',null,5,true,'meetings/cuentas',null);
      }, (error) => {
        this.lib.printErrorSnackBar(error);
      });

    }
    else{
      this.lib.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }
  }

}
