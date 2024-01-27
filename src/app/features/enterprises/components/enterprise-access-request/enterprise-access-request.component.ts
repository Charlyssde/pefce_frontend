import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { SolicitudAccesoEmpresaModel } from 'src/app/core/models/empresas/solicitud-acceso-empresa.model';

@Component({
  selector: 'app-enterprise-access-request',
  templateUrl: './enterprise-access-request.component.html',
  styleUrls: ['./enterprise-access-request.component.css']
})
export class EnterpriseAccessRequestComponent implements OnInit {

  selectedOption: boolean;
  enterprise: EmpresaModel;
  enterpriseRequestForm: FormGroup;
  acceptedMessage: string;
  request: SolicitudAccesoEmpresaModel = new SolicitudAccesoEmpresaModel();

  constructor(
    public dialogRef: MatDialogRef<EnterpriseAccessRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.enterprise = data.enterprise;
    this.request.enterpriseId = this.enterprise.id;
    this.acceptedMessage = "<p>¡Felicitaciones! La empresa "+this.enterprise.empresa+" con RFC "+this.enterprise.rfc+" ha sido aceptada en nuestra plataforma. Las credenciales de acceso para tu usuario principal son:<br><h5>Usuario:</h5><h4><b>{{email}}</b></h4><br><h5>Contraseña:</h5><h4><b>{{password}}</b></h4></p><br><p>Más adelante, si lo deseas puedes actualizar tu contraseña en tu sección <b><i>Mi perfil</i></b></p>";
  }

  ngOnInit() {
    this.request.status = null;
    this.request.message = this.acceptedMessage;
  }

  onChangeStatus(){
    this.request.message = "";
    this.request.message = this.request.status === true ? this.acceptedMessage : this.request.message;
  }

  disableDelete(): boolean{
    return this.request.status === null ? true : (this.request.status===true ? false : (this.request.status === false && (this.request.message === "" || this.request.message === null)));
  }
}
