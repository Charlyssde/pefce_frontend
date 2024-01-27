import { SolicitudesFormComponent } from './../../components/solicitudes-form/solicitudes-form.component';
import { SolicitudesModel } from './../../../../core/models/solicitudes/solicitudes-model';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UsersService } from 'src/app/features/users/services/users.service';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { SolicitudesHistoricoModel } from 'src/app/core/models/solicitudes/solicitudes-historico-model';
import { ProyectosService } from '../../../proyectos/services/proyectos.service';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectRequest } from 'src/app/core/utils/requests/projects/project.request';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
import { EnterprisesService } from 'src/app/features/enterprises/services/enterprises.service';
@Component({
  selector: 'app-solicitudes-update',
  templateUrl: './solicitudes-update.component.html',
  styleUrls: ['./solicitudes-update.component.css']
})
export class SolicitudesUpdateComponent implements OnInit {
  projectRequest = new ProjectRequest();
  usuarioSesion: UsuarioModel;
  idSolicitud: number;
  solicitud: SolicitudesModel;
  historicoItem: SolicitudesHistoricoModel = new SolicitudesHistoricoModel();
  folio: string;
  formProject: FormGroup;

  @ViewChild(SolicitudesFormComponent) formulario: SolicitudesFormComponent;

  constructor(
    public activatedRouter:ActivatedRoute,
    public lib: ScriptsGlobalService,
    public usuariosService: UsersService,
    public proyectoService: ProyectosService,
    public solicitudesService: SolicitudesService,
    private formBuilder: FormBuilder,
    private enterpriseService: EnterprisesService,
  ) { }

  ngOnInit() {

    this.idSolicitud = parseInt(this.activatedRouter.snapshot.paramMap.get('idSolicitud'));
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
      this.solicitud.updatedAt = today;     
      console.log(this.solicitud); 
      this.solicitudesService.updateSolicitud(this.solicitud).subscribe((response)=>{
        this.lib.printSnackbar(13,2,'solicitud',null,5,true,'solicitudes',null);
        this.enterpriseService.getEnterpriseByUserId( response.usuarioSolicitanteId.id ).subscribe((empresa) =>{
          this.formProject = this.formBuilder.group({
            id: [],
            folio: [],
            tipoId: [null],
            empresaId: [ empresa ],
            nombre: [response.descripcion],
            descripcion: [response.comentario],
            prioridad: [null],
            fechaInicio: [new Date()],
            fechaFin: [new Date()],
            area: [response.usuarioEncargadoId.perfiles[0].area],
            montoPrevisto: [null],
            empleosDirectos: [null],
            empleosIndirectos: [null],
            oficioTurno: [null],
            observaciones: [null],
            estatus: ['enProceso'],
            activo: [true,],
            createdAt: [new Date()],
            updatedAt: [new Date()],
            colaboradores: [[response.usuarioEncargadoId, response.usuarioSolicitanteId]]
          });

          let project = this.formProject.getRawValue();
      
          let responsable = new ProyectosColaboradorModel;
          responsable.usuarioId = response.usuarioEncargadoId;
          responsable.rol = 'responsable';
          responsable.activo = true;
          responsable.createdAt = new Date();
          responsable.updatedAt = new Date();

          let interesado = new ProyectosColaboradorModel;
          interesado.usuarioId = response.usuarioSolicitanteId;
          interesado.rol = 'interesado';
          interesado.activo = true;
          interesado.createdAt = new Date();
          interesado.updatedAt = new Date();

          this.projectRequest.project = project;
          this.projectRequest.institutionResponsible = responsable;
          this.projectRequest.enterpriseResponsible = interesado;


          this.proyectoService.create( this.projectRequest).subscribe((response)=>{});
        });

      });
    }
    else{
      this.lib.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }
  }
}
