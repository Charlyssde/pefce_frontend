
import { SolicitudesModel } from './../../../../core/models/solicitudes/solicitudes-model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
//import { DirectorioEmpresarialModel } from 'src/app/core/models/directorio-empresarial.model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
//import { UsuariosService } from 'src/app/features/usuarios/services/usuarios.service';
import { UsersService } from 'src/app/features/users/services/users.service';
import { TiposSolicitud } from 'src/app/core/constants/tipos-solicitud';

@Component({
  selector: 'app-solicitudes-form',
  templateUrl: './solicitudes-form.component.html',
  styleUrls: ['./solicitudes-form.component.css']
})
export class SolicitudesFormComponent implements OnInit {

  formulario: any;

  folio: string = 'No asignado';
  solicitud: SolicitudesModel = new SolicitudesModel();
  @Input() idSolicitud: number;

  /*
  empresas: DirectorioEmpresarialModel[] = [];
  empresasFiltro: DirectorioEmpresarialModel[] = [];
  empresaSeleccionada = null;
  contactosSelect: any[] = null;
  
  areasSelect: any[] = null;
  */
  responsables: UsuarioModel[] = []
  responsablesFiltro: UsuarioModel[] = [];

  //eventos: EventoModel[] = [];

  tiposSolicitud: any = new TiposSolicitud().dataSet;
  /*
  navesItem: SolicitudesNavesModel = new SolicitudesNavesModel();
  naves: SolicitudesNavesModel[] = [];

  promocionesItem: SolicitudesPromocionModel = new SolicitudesPromocionModel();
  promociones: SolicitudesPromocionModel[] = [];

  vinculacionesItem: SolicitudesVinculacionModel = new SolicitudesVinculacionModel();
  vinculaciones: SolicitudesVinculacionModel[] = [];

  asistenciaEventoItem: SolicitudesAsistenciaEventoModel = new SolicitudesAsistenciaEventoModel();
  asistenciaEventos: SolicitudesAsistenciaEventoModel[] = []
  */
  constructor(
    public appC: AppComponent,
    public scriptGL: ScriptsGlobalService,
    private usuariosService: UsersService,
    private solicitudesService: SolicitudesService,
    public formBuilder: FormBuilder,
  ) {
    this.appC.cargandoTexto = "Cargando";
   }

  ngOnInit() {
    this.appC.cargandoTexto = "Cargando";
    this.formulario = this.formBuilder.group({
      id: [null],
      folio: [null],
      tipoSolicitudId: [{value:null,disabled:(this.idSolicitud>0)},Validators.required],
      usuarioEncargadoId:[{value:null,disabled:(this.idSolicitud>0)},Validators.required],
      usuarioSolicitanteId:[null],
      descripcion:[null,Validators.required],
      estatus:[null],
      comentario:[null],
      createdAt:[null],
      updatedAt:[null],
      areasId:[null],
    });
    this.getFormRequestData(this.idSolicitud);
  }

  async getFormRequestData(idSolicitud: number){
    this.appC.cargando = true;
    await this.solicitudesService.formRequiredData(idSolicitud).subscribe((response)=>{
      this.tiposSolicitud = new TiposSolicitud().dataSet;
      this.getResponsables();
      if(this.idSolicitud !== 0){
        let solicitud: SolicitudesModel = response.solicitud;
        this.folio = solicitud.folio;
        this.formulario.setValue(solicitud);
      }
      
      this.appC.cargando = false;
    },(error)=>{
      this.appC.cargando = false;
    });
  }

  applyResponsablesFilter(value: string) {
    this.responsablesFiltro = JSON.parse(JSON.stringify(this.responsables));
    this.selectResponsablesFilter(value);
  }
  selectResponsablesFilter(value:string){
    let filtro = value.trim().toLowerCase();
    if(value !== null || value !== ""){
      let arrFiltrar = JSON.parse(JSON.stringify(this.responsables));
      let arrFiltrado = arrFiltrar.filter(u => (u.nombreCompleto.trim().toLowerCase()).includes(filtro) );
      this.responsablesFiltro = arrFiltrado;
    }
  }

  isJoined(tipoSolicitud: number){
    let joined = [2,3,4,15].indexOf(parseInt(tipoSolicitud.toString())) > -1;
    return joined;
  }

  validForm() {
    return this.formulario.valid;
  }

  async getResponsables(){
    await this.usuariosService.findAllUsersWhereProfileIsInstitution().subscribe(data => {
      this.responsables = data;
      this.responsablesFiltro = data;

    });    
  }  
}
