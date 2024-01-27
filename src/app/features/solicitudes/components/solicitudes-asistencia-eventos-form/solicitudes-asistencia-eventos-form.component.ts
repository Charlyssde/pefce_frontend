import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { SolicitudesAsistenciaEventoModel } from './../../../../core/models/solicitudes/solicitudes-asistencia-evento-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { DirectorioEmpresarialModel } from 'src/app/core/models/directorio-empresarial.model';
import { EventoModel } from 'src/app/core/models/eventos/eventos-model';
import { UsersService } from 'src/app/features/users/services/users.service';

@Component({
  selector: 'app-solicitudes-asistencia-eventos-form',
  templateUrl: './solicitudes-asistencia-eventos-form.component.html',
  styleUrls: ['./solicitudes-asistencia-eventos-form.component.css']
})
export class SolicitudesAsistenciaEventosFormComponent implements OnInit {

  @Output() asistenciaEventoCreated = new EventEmitter<SolicitudesAsistenciaEventoModel>();
  @Input() asistenciaEvento: SolicitudesAsistenciaEventoModel;
  //@Input() empresas: DirectorioEmpresarialModel[];
  @Input() eventos: EventoModel[];
  //empresasFiltro: DirectorioEmpresarialModel[];
  //eventosFiltro: DirectorioEmpresarialModel[];
  contactosSelect: any[] = null;
  isEdit: boolean = false;

  constructor(
    public lib: ScriptsGlobalService,
    private uService: UsersService,
  ) { }

  ngOnInit() {
    if(this.asistenciaEvento.id !== null){
      this.isEdit = true;
      this.getUsuariosByDirectorio(this.asistenciaEvento.directorioEmpresarialId);
    }
    //this.empresasFiltro = this.empresas;
  }

  applyEmpresasFilter(value: string):void {
    //this.empresasFiltro = JSON.parse(JSON.stringify(this.empresas));
    this.selectEmpresasFilter(value);
  }
  selectEmpresasFilter(value: string):void {
    let filtro = value.trim().toLowerCase();
    if(value !== null || value !== ""){
/*       let arrFiltrar = JSON.parse(JSON.stringify(this.empresas));
      let arrFiltrado = arrFiltrar.filter(e => (e.nombreLegal.trim().toLowerCase()).includes(filtro) );
      this.empresasFiltro = arrFiltrado;
 */    }
  }
  async getUsuariosByDirectorio(empresa: any, contacto: any = null) {
    this.asistenciaEventoDataAdded();
    if(empresa){
      /* await this.uService.pageByDirectorioEmpresarial(empresa.id).subscribe(contactos => {
        if (contactos.length > 0) {
          this.contactosSelect = contactos;
        } else {
          this.contactosSelect = null;
        }
      },(error)=>{
      }); */
    }
  }

  applyEventosFilter(value: string):void {
    //this.eventosFiltro = JSON.parse(JSON.stringify(this.eventos));
    this.selectEventosFilter(value);
  }
  selectEventosFilter(value: string):void {
    let filtro = value.trim().toLowerCase();
    if(value !== null || value !== ""){
      let arrFiltrar = JSON.parse(JSON.stringify(this.eventos));
      let arrFiltrado = arrFiltrar.filter(e => (e.nombreEvento.trim().toLowerCase()).includes(filtro) );
      //this.eventosFiltro = arrFiltrado;
    }
  }

  validateAsistenciaEventoData():boolean{
    let valid = false;
    if(this.asistenciaEvento.eventoId !== null){
      if(this.asistenciaEvento.tipoParticipacion !== null){
        if(this.asistenciaEvento.directorioEmpresarialId !== null){
          if(this.asistenciaEvento.usuarioContactoId !== null){
            valid = true;
          }
        }
      }
    }
    return valid;
  }

  asistenciaEventoDataAdded(){
    if(this.validateAsistenciaEventoData()){
      this.asistenciaEventoCreated.emit(this.asistenciaEvento);
    }
  }

}
