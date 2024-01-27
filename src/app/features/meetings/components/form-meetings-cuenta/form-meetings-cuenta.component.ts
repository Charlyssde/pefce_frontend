import { MeetingCuentasModel } from './../../../../core/models/meetings/meeting_cuentas-model';
import { CatalogoModel } from '../../../../core/models/catalogos/catalogo-model';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MeetingsService } from './../../services/meetings.service';
import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

@Component({
  selector: 'app-form-meetings-cuenta',
  templateUrl: './form-meetings-cuenta.component.html',
  styleUrls: ['./form-meetings-cuenta.component.css']
})
export class FormMeetingsCuentaComponent implements OnInit {

  formulario: any;
  areasList: CatalogoModel[] = [];

  @Input() idCuentaMeeting: number;

  constructor(
    public appC: AppComponent,
    public lib: ScriptsGlobalService,
    private meetingsService: MeetingsService,
    public formBuilder: FormBuilder,
  ) {
    this.appC.cargandoTexto = "Cargando";
   }

  ngOnInit() {
    this.appC.cargandoTexto = "Cargando";
    this.formulario = this.formBuilder.group({
      id: [null],
      areasId: [null],
      name: [null, Validators.required],
      zoomUserId: [null, Validators.required ],
      zoomUserPwd: [null, Validators.required ],
      zoomAccountId: [null, Validators.required ],
      zoomClientId: [null, Validators.required ],
      zoomClientSecret: [null, Validators.required ],
      zoomSecretTokenFeatures: [null, Validators.required ],
      zoomSecretVerificationFeatures: [null, Validators.required ],
      activo: [false, Validators.required ],
      createdAt: [null],
      updatedAt: [null],
    });
    this.getForRequiredData();
  }

  async getForRequiredData(){
    await this.meetingsService.getFormRequiredData(this.idCuentaMeeting).subscribe(response => {
      if(response){
        this.areasList = response.areas;

        if(this.idCuentaMeeting !== 0){
          let cuentaMeeting: MeetingCuentasModel = response.cuentaMeeting;
          this.formulario.setValue(cuentaMeeting);
        }
      }
    });
  }

  verifyZoomAccountData(){
    let meetingAccountCredentialRequest = {
      zoomAccountId: this.formulario.get('zoomAccountId').value,
      zoomClientId: this.formulario.get('zoomClientId').value,
      zoomClientSecret: this.formulario.get('zoomClientSecret').value
    };
    this.meetingsService.getAuthTokenReference(meetingAccountCredentialRequest).subscribe(response => {
      if(response){
        this.lib.printSnackbar(15,null,null,"Cuenta verificada exitosamente",7,false,null,null);
      }
    },error => {
      this.lib.printSnackbar(15,null,null,"Revisa la información ingresada ya que no fue posible verificar lac cuenta de Zoom",7,false,null,null);
    });
  }

  disabledVerifyZoomAccountData():boolean{
    let
      accountId = this.formulario.get('zoomAccountId').value,
      clientId = this.formulario.get('zoomClientId').value,
      clientSecret = this.formulario.get('zoomClientSecret').value;

    return !(accountId!==null && clientId!==null && clientSecret!==null);
  }

  validForm() {
    return this.formulario.valid;
  }

}
