import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { SolicitudesVinculacionModel } from './../../../../core/models/solicitudes/solicitudes-vinculacion-model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TiposSolicitud } from 'src/app/core/constants/tipos-solicitud';
import { UsersService } from 'src/app/features/users/services/users.service';
//import { DirectorioEmpresarialModel } from 'src/app/core/models/directorio-empresarial.model';

@Component({
  selector: 'app-solicitudes-vinculaciones-form',
  templateUrl: './solicitudes-vinculaciones-form.component.html',
  styleUrls: ['./solicitudes-vinculaciones-form.component.css']
})
export class SolicitudesVinculacionesFormComponent implements OnInit {

  @Output() vinculacionCreated = new EventEmitter<SolicitudesVinculacionModel>();
  @Input() vinculaciones: SolicitudesVinculacionModel;
  @Input() tipoVinculacion: number;
  //@Input() empresas: DirectorioEmpresarialModel[];

  //empresasFiltro: DirectorioEmpresarialModel[];
  contactosSelect: any[] = null;

  tiposSolicitud: any = new TiposSolicitud().dataSet;

  isEdit: boolean = false;

  constructor(
    public lib: ScriptsGlobalService,
    private uService: UsersService,
  ) { }

  ngOnInit() {
    //this.empresasFiltro = this.empresas;
    this.vinculaciones.tipoVinculacion = this.tipoVinculacion;
    if(this.vinculaciones.id !== null){
      this.isEdit = true;
      //this.getUsuariosByDirectorio(this.vinculaciones.directorioEmpresarialId);
    }
  }

  applyEmpresasFilter(value: string):void {
    //this.empresasFiltro = JSON.parse(JSON.stringify(this.empresas));
    this.selectEmpresasFilter(value);
  }
  selectEmpresasFilter(value: string):void {
    let filtro = value.trim().toLowerCase();
    if(value !== null || value !== ""){
      //let arrFiltrar = JSON.parse(JSON.stringify(this.empresas));
      //let arrFiltrado = arrFiltrar.filter(e => (e.nombreLegal.trim().toLowerCase()).includes(filtro) );
      //this.empresasFiltro = arrFiltrado;
    }
  }

  async getUsuariosByDirectorio(empresa: any, contacto: any = null) {

/*     this.vinculacionDataAdded();
    if(empresa){
      await this.uService.pageByDirectorioEmpresarial(empresa.id).subscribe(contactos => {
        if (contactos.length > 0) {
          this.contactosSelect = contactos;
        } else {
          this.contactosSelect = null;
        }
      },(error)=>{
      });
    }
 */  }

  validateVinculacionData():boolean{
    let valid = false;
    if(this.vinculaciones.tipoVinculacion !== null){
      if(this.vinculaciones.directorioEmpresarialId !== null){
        valid = true;
      }
    }
    return valid;
  }

  vinculacionDataAdded(){
    if(this.validateVinculacionData()){
      this.vinculacionCreated.emit(this.vinculaciones);
    }
  }

}
