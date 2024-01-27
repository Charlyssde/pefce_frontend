import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SolicitudesPromocionModel } from 'src/app/core/models/solicitudes/solicitudes-promocion-model';

@Component({
  selector: 'app-solicitudes-promociones-form',
  templateUrl: './solicitudes-promociones-form.component.html',
  styleUrls: ['./solicitudes-promociones-form.component.css']
})
export class SolicitudesPromocionesFormComponent implements OnInit {

  @Output() promocionCreated = new EventEmitter<SolicitudesPromocionModel>();
  @Input() promociones: SolicitudesPromocionModel;


  constructor() { }

  ngOnInit() {
    if(this.promociones.id !== null){
      this.promociones.coordenadas = JSON.stringify(this.promociones.coordenadas);
      this.promociones.tipoPropiedad = JSON.stringify(this.promociones.tipoPropiedad);
    }
  }

  validatePromocionData(): boolean{
    let valid = false;

    if(this.promociones.ubicacion !== null){
      if(this.promociones.coordenadas !== null){
        if(this.promociones.superficie !== null){
          //Hectareas - metros cuadrados
          if(this.promociones.unidadSuperficie !== null){
            if(this.promociones.valorM2 !== null){
              if(this.promociones.permisos !== null){
                if(this.promociones.tipoPropiedad !== null){
                  if(this.promociones.datosDocumento !== null){
                    valid = true;
                  }
                }
              }
            }
          }
        }
      }
    }

    return valid;
  }

  promocionDataAdded(){
    if(this.validatePromocionData()){
      this.promocionCreated.emit(this.promociones);
    }
  }

}
