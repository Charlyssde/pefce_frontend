import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { TemaModel } from 'src/app/core/models/capacitaciones/tema-model';
import { PreguntaModel } from 'src/app/core/models/capacitaciones/pregunta-model';
import { TemasService } from 'src/app/features/capacitaciones/temas/service/temas.service';
import { PreguntasService } from 'src/app/features/capacitaciones/preguntas/service/preguntas.service';
import { CuestionarioPreguntaComponent } from '../cuestionario-pregunta/cuestionario-pregunta.component';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {

  idTema = 0;
  idAula = 0;
  tema: TemaModel = new TemaModel;
  preguntas: Array<PreguntaModel> = new Array<PreguntaModel>();
  @ViewChildren('cuestionarioPreguntas') cuestionarioPreguntas:QueryList<CuestionarioPreguntaComponent>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public scriptGL: ScriptsGlobalService,
    private temaService: TemasService,
    private preguntasService: PreguntasService,
  ) { }

  ngOnInit() {
    this.idTema = parseInt(this.route.snapshot.paramMap.get('id_tema'));
    this.idAula = parseInt(this.route.snapshot.paramMap.get('id_capacitacion'));
    this.temaService.findById(this.idTema).subscribe(data => {
      if (data) {
        this.tema = data;
      }else{
        this.scriptGL.printSnackbar(3, 1, 'tema', null, 5, false, null, null);      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
    });
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.preguntasService.page(this.idTema).subscribe(data => {
      if (data) {
        this.preguntas = data;
      }else{
        this.scriptGL.printSnackbar(2, 1, 'preguntas', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
    });
  }

  guardarRespuestas(){
    var isValidated = true;
    var temporalArray = [];
    this.cuestionarioPreguntas.forEach(element => {      
      if (element.respuestas == null ) {
        isValidated = false;
      }else{
        var temporalObject = element.usuarioRespuesta;
        temporalObject.createdAt = new Date;
        temporalArray.push(temporalObject);
      }
    });
    if (isValidated) {
      this.preguntasService.createUsuarioPregunta(temporalArray).subscribe(data => {
        this.scriptGL.printSnackbar(15,null,null,"Respuestas guardadas correctamente",5,false,null,null);
        window.location.reload();
      });
    }else{
      this.scriptGL.printSnackbar(15,null,null,"Por favor, responda todas las preguntas antes de guardar",5,false,null,null);
    }
  }
}
