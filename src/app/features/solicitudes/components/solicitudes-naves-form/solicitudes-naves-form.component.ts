import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { SolicitudesNavesModel } from 'src/app/core/models/solicitudes/solicitudes-naves-model';

@Component({
  selector: 'app-solicitudes-naves-form',
  templateUrl: './solicitudes-naves-form.component.html',
  styleUrls: ['./solicitudes-naves-form.component.css']
})
export class SolicitudesNavesFormComponent implements OnInit {

  @Output() naveCreated = new EventEmitter<SolicitudesNavesModel>();
  @Input() naves: SolicitudesNavesModel;

  isEdit: boolean = false;

  constructor(
    public lib: ScriptsGlobalService,
  ) { }

  ngOnInit() {
    if(this.naves.id !== null){
      this.naves.caracteristicas = JSON.parse(this.naves.caracteristicas);
    }
  }

  validateNavesData(): boolean{
    let valid = false;
    if(this.naves.ubicacionSolicitada !== null){
      if(this.naves.terreno !== null && this.naves.terreno>0){
        if(this.naves.caracteristicas !== null){
          valid = true;
        }
      }
    }
    return valid;
  }

  naveDataAdded(){
    if(this.validateNavesData()){
      this.naveCreated.emit(this.naves);
    }
  }

}
