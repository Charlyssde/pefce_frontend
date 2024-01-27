import { environment } from '../../../../../environments/environment';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TemaModel } from 'src/app/core/models/capacitaciones/tema-model';
import { AdministracionWebService } from 'src/app/features/administracion-pagina-contenido/services/administracion-web.service';

@Component({
  selector: 'app-aula-tema',
  templateUrl: './aula-tema.component.html',
  styleUrls: ['./aula-tema.component.css']
})
export class AulaTemaComponent implements OnInit {
  fileEndpoint: string = environment.apiUrl+'/files/getUrl?pathfile=';

  @Input() tema: TemaModel;
  @Input() capacitacion: CapacitacionModel;
  @Input() permitirResponder: Boolean;
  @Output() cambiarAModulos: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private router: Router,
    private awService: AdministracionWebService
  ) { }

  ngOnInit() {
    this.getMultimedia();
  }

  mostrarModulos(){
    this.cambiarAModulos.emit(true);
  }

  getMultimedia(){
    this.tema.recurso = (this.tema.recurso && this.tema.recurso !== '') ? this.fileEndpoint+this.tema.recurso : null;
  }

  mostrarCuestionario(){
    this.router.navigate(['/audienciaCapacitaciones/aula/'+this.capacitacion.id+'/cuestionario/'+this.tema.id]);
  }
}
