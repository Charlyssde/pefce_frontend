import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { ModuloModel } from 'src/app/core/models/capacitaciones/modulo-model';
import { TemasService } from 'src/app/features/capacitaciones/temas/service/temas.service';

@Component({
  selector: 'app-aula-modulo',
  templateUrl: './aula-modulo.component.html',
  styleUrls: ['./aula-modulo.component.css']
})
export class AulaModuloComponent implements OnInit {

  temas: any;

  @Input() modulo: ModuloModel;
  @Output() cambiarATema: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private temasService: TemasService,
    private scriptGL: ScriptsGlobalService,
  ) { }

  ngOnInit() {
    this.temasService.page(this.modulo.id).subscribe(data => {
      if (data) {
        this.temas = data;
      }else{
        this.scriptGL.printSnackbar(2, 1, 'modulos', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
    });
  }

  mostrarTema(tema: any){
    this.cambiarATema.emit(tema);
  }
}
