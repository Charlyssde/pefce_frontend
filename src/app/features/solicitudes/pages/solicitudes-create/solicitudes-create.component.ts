import { SolicitudesHistoricoModel } from './../../../../core/models/solicitudes/solicitudes-historico-model';
import { UsersService } from 'src/app/features/users/services/users.service';

import { SolicitudesFormComponent } from './../../components/solicitudes-form/solicitudes-form.component';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudesModel } from 'src/app/core/models/solicitudes/solicitudes-model';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import {ProfileModel} from '../../../../core/models/profiles/profiles.model';

@Component({
  selector: 'app-solicitudes-create',
  templateUrl: './solicitudes-create.component.html',
  styleUrls: ['./solicitudes-create.component.css']
})
export class SolicitudesCreateComponent implements OnInit {

  usuarioSesion: UsuarioModel;
  solicitud: SolicitudesModel = new SolicitudesModel();
  historicoItem: SolicitudesHistoricoModel = new SolicitudesHistoricoModel();
  @ViewChild(SolicitudesFormComponent) formulario: SolicitudesFormComponent;

  constructor(
    public solicitudesService: SolicitudesService,
    public usuariosService: UsersService,
    private lib: ScriptsGlobalService
  ) { }

  ngOnInit() {
    this.getUsuarioSesion(this.lib.getUserSessionData().idUsuario);
  }

  async getUsuarioSesion(idUsuario: number){
    this.usuariosService.findById(idUsuario).subscribe(usuario=>{
      this.usuarioSesion = usuario;
    });
  }

  async save(){
    if(this.formulario.validForm()){
      let today = new Date();
      this.solicitud = this.formulario.formulario.getRawValue();
      this.solicitud.estatus = false;
      this.solicitud.createdAt = today;
      this.solicitud.updatedAt = null;

      await this.solicitudesService.createSolicitud(this.solicitud).subscribe((solicitud) => {
        this.lib.printSnackbar(12,2,'solicitud',null,5,true,'solicitudes',null);
      }, (error) => {
        this.lib.printErrorSnackBar(error);
      });
    }
    else{
      this.lib.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }
  }

}
